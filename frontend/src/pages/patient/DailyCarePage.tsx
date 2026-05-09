import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getProfile, getTodayLog, saveTodayLog, getLogs } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Clock, Droplets, Footprints, Moon, Pill } from 'lucide-react';



const DailyCarePage = () => {
  const profile = getProfile()!;
  const [log, setLog] = useState(getTodayLog());
  const [showReport, setShowReport] = useState(false);

  

  const logs = getLogs();

  

 
  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground flex items-center gap-2">
          <Clock className="text-primary" size={24} /> Doctor
        </h1>
      </motion.div>

      {/*  DOCTOR CONSULTATION */}
      <GlassCard className="p-4 border-l-4 border-primary">
        <h3 className="text-lg font-bold text-foreground">👩‍⚕️ Consult Doctor</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Share your AI-generated PCOS report with a specialist
        </p>

        <div className="flex gap-2 mt-3">
          <button className="bg-primary text-white px-3 py-1 rounded">
            📞 Audio Call
          </button>
          <button className="bg-primary text-white px-3 py-1 rounded">
            🎥 Video Call
          </button>
        </div>

        <button
          onClick={() => setShowReport(true)}
          className="mt-3 text-sm text-primary underline"
        >
          📄 View My Health Report
        </button>
      </GlassCard>

      {/* REPORT MODAL */}
      {/* REPORT MODAL */}
{showReport && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">

    <div className="bg-white rounded-3xl w-full max-w-md p-5 space-y-4 max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center text-white font-bold text-lg">
          {profile.name?.charAt(0)}
        </div>

        <div>
          <h2 className="font-bold text-lg">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">
            Age {profile.age || 22}
          </p>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="bg-pink-50 rounded-2xl p-4 text-center">
        <p className="text-xs text-muted-foreground">
          PCOS Prediction
        </p>

        <h2 className="text-xl font-bold text-red-500 mt-1">
          PCOS Detected (87%)
        </h2>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: '87%' }}
          />
        </div>

        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
          <span>87% probability</span>
          <span>87/100</span>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold mb-2">👤 Personal Info</h3>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Name</p>
            <p>{profile.name}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Age</p>
            <p>{profile.age || 22}</p>
          </div>

          <div>
            <p className="text-muted-foreground">PCOS Risk</p>
            <p className="text-red-500 font-semibold">HIGH</p>
          </div>

          <div>
            <p className="text-muted-foreground">Hydration</p>
            <p>{log.water} glasses</p>
          </div>
        </div>
      </div>

      {/* Cycle History */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold mb-2">🩸 Cycle History</h3>

        <p className="text-sm">
          Irregular cycles detected (45-day average cycle)
        </p>
      </div>

      {/* Symptoms */}
      {/* <div className="bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold mb-2">⚠ Symptoms Logged</h3>

        <div className="flex flex-wrap gap-2">
          {["Hair Loss", "Acne", "Weight Gain"].map((item) => (
            <span
              key={item}
              className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div> */}

      {/* Lifestyle */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold mb-2">🌿 Lifestyle Data</h3>

        <p className="text-sm">
          Sedentary lifestyle, low sleep quality, high stress levels.
        </p>
      </div>

      {/* Daily Logs */}
      {/* <div className="bg-gray-50 rounded-2xl p-4">
        <h3 className="font-semibold mb-2">📊 Today's Logs</h3> 

        {/* <div className="space-y-1 text-sm">

          <p>💧 Water Intake: {log.water} glasses</p>

          <p>👣 Steps Walked: {log.steps}</p>

          <p>🌙 Sleep Hours: {log.sleep}</p>

          <p>💊 Medication Taken: {log.medicine ? "Yes" : "No"}</p>

        </div> 
      </div> */}

      {/* Close Button */}
      <button
        onClick={() => setShowReport(false)}
        className="w-full bg-primary text-white py-2 rounded-xl"
      >
        Close Report
      </button>

    </div>
  </div>
)}

      

    </div>
  );
};

export default DailyCarePage;