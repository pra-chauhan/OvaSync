from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware
import shap
import numpy as np
from sqlalchemy import Column, Integer, Float, String, JSON
from database import Base, engine, SessionLocal
from diet_engine import generate_diet_plan, generate_ai_diet
from dotenv import load_dotenv
from datetime import datetime
import json
import re
load_dotenv()





class PCOSRecord(Base):
    __tablename__ = "pcos_records"

    id = Column(Integer, primary_key=True, index=True)

    age = Column(Integer)
    bmi = Column(Float)
    cycle = Column(Integer)

    prediction = Column(Integer)
    probability = Column(Float)

    lifestyle_score = Column(Integer)
    stress_score = Column(Integer)

    top_factors = Column(JSON)  

    created_at = Column(String)
app = FastAPI()

PCOSRecord.metadata.create_all(bind=engine)

# LOAD MODELS
advanced_model = joblib.load("models/pcos_best_model.pkl")
advanced_features = joblib.load("models/pcos_selected_features.pkl")

basic_model = joblib.load("models/pcos_basic_model.pkl")
basic_features = joblib.load("models/pcos_basic_features.pkl")

basic_scaler = joblib.load("models/basic_scaler.pkl")
advanced_scaler = joblib.load("models/advanced_scaler.pkl")

# SHAP EXPLAINERS 
try:
    advanced_explainer = shap.TreeExplainer(advanced_model)
    basic_explainer = shap.TreeExplainer(basic_model)
except Exception as e:
    print("SHAP INIT ERROR:", e)
    advanced_explainer = None
    basic_explainer = None

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# INPUT SCHEMA
class PatientData(BaseModel):
    data: dict

# JSON CLEANER
def extract_json(text):
    try:
        # remove markdown ```json or ```
        text = re.sub(r"```(json)?", "", text).strip()

        # extract JSON object safely
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            return json.loads(match.group())

        return json.loads(text)

    except Exception as e:
        print("❌ FINAL JSON EXTRACTION FAILED:", e)
        return None

# SHAP + FALLBACK explanation
def get_explanation(explainer, scaled_input, input_df, feature_names):

    # ---------------- SHAP EXPLANATION ----------------
    if explainer is not None:
        try:
            shap_values = explainer.shap_values(scaled_input)

            # Handle different SHAP formats
            if isinstance(shap_values, list):
                values = shap_values[1][0]

            elif hasattr(shap_values, "values"):
                values = shap_values.values[0]

            else:
                values = shap_values[0]

            # Top 5 important features
            top_idx = np.argsort(np.abs(values))[::-1][:5]

            return [
                {
                    "feature": feature_names[i],
                    "impact": float(values[i]),
                    "value": float(input_df.iloc[0][feature_names[i]])
                }
                for i in top_idx
            ]

        except Exception as e:
            print("SHAP FAILED → using fallback:", e)

    # ---------------- FALLBACK ----------------
    data = input_df.iloc[0].to_dict()

    fallback = []

    if data.get("BMI", 0) > 25:
        fallback.append({
            "feature": "BMI",
            "impact": 0.30,
            "value": data.get("BMI")
        })

    if data.get("Cycle(R/I)", 0) == 1:
        fallback.append({
            "feature": "Cycle(R/I)",
            "impact": 0.40,
            "value": data.get("Cycle(R/I)")
        })

    if data.get("Weight gain(Y/N)", 0) == 1:
        fallback.append({
            "feature": "Weight gain(Y/N)",
            "impact": 0.25,
            "value": data.get("Weight gain(Y/N)")
        })

    if data.get("hair growth(Y/N)", 0) == 1:
        fallback.append({
            "feature": "hair growth(Y/N)",
            "impact": 0.35,
            "value": data.get("hair growth(Y/N)")
        })

    if data.get("Pimples(Y/N)", 0) == 1:
        fallback.append({
            "feature": "Pimples(Y/N)",
            "impact": 0.20,
            "value": data.get("Pimples(Y/N)")
        })

    if data.get("Fast food (Y/N)", 0) == 1:
        fallback.append({
            "feature": "Fast food (Y/N)",
            "impact": 0.15,
            "value": data.get("Fast food (Y/N)")
        })

    if data.get("Reg.Exercise(Y/N)", 0) == 0:
        fallback.append({
            "feature": "Reg.Exercise(Y/N)",
            "impact": 0.20,
            "value": data.get("Reg.Exercise(Y/N)")
        })

    return fallback[:5]


def prepare_input(patient_data, feature_list):

    input_df = pd.DataFrame([patient_data])

    for feat in feature_list:
        if feat not in input_df.columns:
            input_df[feat] = 0

    input_df = input_df[feature_list]
    input_df = input_df.apply(pd.to_numeric, errors='coerce').fillna(0)

    return input_df


def calculate_lifestyle_score(data):

    score = 100

    if data.get("Fast food (Y/N)", 0) == 1:
        score -= 20
    if data.get("Reg.Exercise(Y/N)", 0) == 0:
        score -= 25
    if data.get("BMI", 0) > 25:
        score -= 15
    if data.get("Weight gain(Y/N)", 0) == 1:
        score -= 15

    return max(score, 0)


def calculate_stress_score(data):

    score = 0

    if data.get("Cycle(R/I)", 0) == 1:
        score += 25
    if data.get("Hair loss(Y/N)", 0) == 1:
        score += 20
    if data.get("Pimples(Y/N)", 0) == 1:
        score += 15
    if data.get("Weight gain(Y/N)", 0) == 1:
        score += 20

    return min(score, 100)


@app.post("/predict-basic")
def predict_basic(patient: PatientData):

    try:
        input_df = prepare_input(patient.data, basic_features)

        scaled_input = basic_scaler.transform(input_df)

        prob = basic_model.predict_proba(scaled_input)[0][1]
        prediction = int(prob > 0.5)

        top_factors = get_explanation(
            basic_explainer,
            scaled_input,
            input_df,
            basic_features
        )

        lifestyle = calculate_lifestyle_score(patient.data)
        stress = calculate_stress_score(patient.data)

        db = SessionLocal()

        record = PCOSRecord(
            age=patient.data.get("Age (yrs)", 0),
            bmi=patient.data.get("BMI", 0),
            cycle=patient.data.get("Cycle(R/I)", 0),

            prediction=prediction,
            probability=float(prob),

            lifestyle_score=lifestyle,
            stress_score=stress,

            top_factors=top_factors,
            created_at=str(datetime.now())
        )

        db.add(record)
        db.commit()
        db.close()

        return {
            "mode": "basic",
            "prediction": prediction,
            "pcos_probability": float(prob),
            "top_factors": top_factors,
            "lifestyle_score": lifestyle,
            "stress_score": stress
        }

    except Exception as e:
        print("BASIC ERROR:", e)
        return {"error": str(e)}


@app.post("/predict-advanced")
def predict_advanced(patient: PatientData):

    try:
        input_df = prepare_input(patient.data, advanced_features)

        scaled_input = advanced_scaler.transform(input_df)

        prob = advanced_model.predict_proba(scaled_input)[0][1]
        prediction = int(prob > 0.5)
    
        top_factors = get_explanation(
            advanced_explainer,
            scaled_input,
            input_df,
            advanced_features
        )

        lifestyle = calculate_lifestyle_score(patient.data)
        stress = calculate_stress_score(patient.data)

        db = SessionLocal()

        record = PCOSRecord(
            age=patient.data.get("Age (yrs)", 0),
            bmi=patient.data.get("BMI", 0),
            cycle=patient.data.get("Cycle(R/I)", 0),

            prediction=prediction,
            probability=float(prob),

            lifestyle_score=lifestyle,
            stress_score=stress,

            top_factors=top_factors,
            created_at=str(datetime.now())
        )

        db.add(record)
        db.commit()
        db.close()

        return {
            "mode": "advanced",
            "prediction":prediction,
            "pcos_probability": float(prob),
            "top_factors": top_factors,
            "lifestyle_score": lifestyle,
            "stress_score": stress
        }
    
    except Exception as e:
        print("ADVANCED ERROR:", e)
        return {"error": str(e)}


@app.post("/generate-diet")
def generate_diet():

    db = SessionLocal()
    user = db.query(PCOSRecord).order_by(PCOSRecord.id.desc()).first()
    db.close()

    if not user:
        return {
            "success": False,
            "error": "No user data found. Please run prediction first."
        }

    print("🔥 Generating diet for user:", user.id)

    nutrition = generate_diet_plan(user)

    diet_plan = generate_ai_diet(user, nutrition)

    print("✅ RAW AI DIET:", diet_plan)

       
    if isinstance(diet_plan, dict):
            final_diet = diet_plan

       
    elif isinstance(diet_plan, str):
        parsed = extract_json(diet_plan)
        final_diet = parsed if parsed else {"raw": diet_plan}

    else:
        final_diet = {"raw": str(diet_plan)}

    return {
        "success": True,
        "nutrition": nutrition,
        "diet_plan": final_diet
    }