import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Welcome to PCOS Care</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/doctor/login")}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Login as Doctor
        </button>

        <button
          onClick={() => navigate("/onboarding")}
          className="px-6 py-2 bg-pink-500 text-white rounded"
        >
          Continue as Patient
        </button>
      </div>
    </div>
  );
};

export default LandingPage;