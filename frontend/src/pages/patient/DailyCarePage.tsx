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

      {/* 🔥 REPORT MODAL */}
      {showReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-[90%] max-w-md">

            <h3 className="text-lg font-bold mb-2">PCOS Report</h3>

            {/* 👉 Replace with your real model data if available */}
            <p className="text-sm">Risk Score: <b className="text-red-500">High - For instance</b></p>
            <p className="text-sm">Lifestyle Score: Moderate ( for instance) </p>
            <p className="text-sm">Stress Risk: High ( for instance) </p>

            <p className="text-xs mt-2 text-muted-foreground">
              Key Factors: Irregular cycle, BMI, low hydration -- currently system generates random data, but will be replaced with real model predictions in the future.
            </p>

            <button
              onClick={() => setShowReport(false)}
              className="mt-3 bg-primary text-white px-3 py-1 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}

      

    </div>
  );
};

export default DailyCarePage;