// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import GlassCard from '@/components/ui/GlassCard';
// import OrbStat from '@/components/ui/OrbStat';
// import ProgressBar3D from '@/components/ui/ProgressBar3D';
// import { getLogs } from '@/lib/store';
// import { cn } from '@/lib/utils';
// import { Clock,  Footprints, Moon, Pill } from 'lucide-react';

// import {
//   getProfile,
//   getTodayLog,
//   saveTodayLog,
//   getDayOfCycle,
//   getCyclePhase,
//   PHASE_LABELS,
//   calculateBMR,
//   calculateTDEE
// } from '@/lib/store';
// import { Plus, Minus, Droplets } from 'lucide-react';

// const DashboardPage = () => {
//   const profile = getProfile()!;
//   const [log, setLog] = useState(getTodayLog());
//   const [streak, setStreak] = useState(6); //the 6 over here is just for instance. 

//   const dayOfCycle = getDayOfCycle(profile.lastPeriodDate);
//   const phase = getCyclePhase(dayOfCycle, profile.cycleLength);

//   const REMINDERS = [
//   { key: 'water', icon: Droplets, label: 'Drink Water', interval: 'Every 2 hours', color: 'text-sage' },
//   { key: 'walk', icon: Footprints, label: '10-min Walk', interval: 'After meals', color: 'text-primary' },
//   { key: 'stretch', icon: Clock, label: 'Stretch Break', interval: 'Every 3 hours', color: 'text-accent' },
//   { key: 'sleep', icon: Moon, label: 'Sleep by 10 PM', interval: 'Daily', color: 'text-secondary' },
// ];

// const MEDICATIONS = ['Vitamin D', 'Iron', 'Inositol', 'Omega-3', 'Folic Acid', 'Zinc', 'Magnesium']

//   const bmr = calculateBMR(profile.weight, profile.height, profile.age);
//   const tdee = calculateTDEE(bmr, profile.activityLevel);

//   useEffect(() => {
//     saveTodayLog(log);
//   }, [log]);

//   const addValue = (key: 'water', amount: number) => {
//     setLog(p => ({ ...p, [key]: Math.max(0, p[key] + amount) }));
//   };

//   const greeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

  
//   const getAIInsight = () => {
//     if (phase === 'pms') {
//       return "Your body is in PMS phase — focus on rest, hydration, and stress reduction today.";
//     }
//     if (log.water < 4) {
//       return "Low hydration detected — increasing water intake can help hormonal balance.";
//     }
//     return "You're maintaining good health habits — keep your routine consistent.";
//   };

//   const [activeReminders, setActiveReminders] = useState<Set<string>>(
//     new Set(JSON.parse(localStorage.getItem('aura_reminders') || '["water","walk","stretch","sleep"]'))
//   );

//   const logs = getLogs();

//   useEffect(() => { saveTodayLog(log); }, [log]);

//   const toggleReminder = (key: string) => {
//     setActiveReminders(prev => {
//       const n = new Set(prev);
//       n.has(key) ? n.delete(key) : n.add(key);
//       localStorage.setItem('aura_reminders', JSON.stringify([...n]));
//       return n;
//     });
//   };

//   const toggleMed = (med: string) => {
//     setLog(prev => ({
//       ...prev,
//       medications: prev.medications.includes(med)
//         ? prev.medications.filter(m => m !== med)
//         : [...prev.medications, med],
//     }));
//   };

//   return (
//     <div className="space-y-5">

//       {/* Greeting */}
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-2xl font-display text-foreground">
//           {greeting()}, {profile.name} 🌸
//         </h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Day {dayOfCycle} · <span className="font-semibold text-primary">{PHASE_LABELS[phase]} Phase</span>
//         </p>
//       </motion.div>

//        {/* AI HEALTH INSIGHTTT
//       <GlassCard tilt className="border-l-4 border-primary">
//         <p className="text-xs font-semibold text-primary mb-1">🤖 AI Health Insight</p>
//         <p className="text-sm text-foreground">{getAIInsight()}</p>
//       </GlassCard> */}

//       {/* Phase Card (Improved Emotional) */}
//       <GlassCard tilt className="text-center">
//         <span className="text-sm text-muted-foreground">Current Phase</span>
//         <h2 className="text-xl font-bold capitalize text-primary">
//           {PHASE_LABELS[phase]}
//         </h2>
//         <p className="text-xs text-muted-foreground mt-1">
//           Take care of your body accordingly 💖
//         </p>

//         <ProgressBar3D
//           value={dayOfCycle}
//           max={profile.cycleLength}
//           color="bg-primary"
//           className="mt-3"
//           label={`Day ${dayOfCycle} of ${profile.cycleLength}`}
//         />
//       </GlassCard>

      

      
//       <GlassCard className="border-l-4 border-accent">
//         <p className="text-xs text-accent font-semibold mb-1">🧠 Smart Recommendation</p>
//         <p className="text-sm text-foreground">
//           Based on your current phase and activity, maintaining hydration and light exercise today can improve hormonal balance.
//         </p>
//       </GlassCard>

//       {/* Reminders */}
//       <GlassCard>
//         <h3 className="font-display text-lg text-foreground mb-3">Reminders</h3>
//         <div className="space-y-2">
//           {REMINDERS.map(({ key, icon: Icon, label, interval, color }) => (
//             <div key={key} className="flex items-center gap-3">
//               <Icon size={18} className={color} />
//               <div className="flex-1">
//                 <p className="text-sm font-semibold text-foreground">{label}</p>
//                 <p className="text-[10px] text-muted-foreground">{interval}</p>
//               </div>

//               <button
//                 onClick={() => toggleReminder(key)}
//                 className={cn(
//                   'w-12 h-6 rounded-full relative transition-all',
//                   activeReminders.has(key) ? 'bg-primary' : 'bg-muted',
//                 )}
//               >
//                 <motion.div
//                   className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-md"
//                   animate={{ left: activeReminders.has(key) ? 26 : 2 }}
//                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                 />
//               </button>
//             </div>
//           ))}
//         </div>
//       </GlassCard>

//       {/* Medication Tracker */}
//       <GlassCard>
//         <h3 className="font-display text-lg text-foreground flex items-center gap-2 mb-3">
//           <Pill size={18} className="text-primary" /> Medication Tracker
//         </h3>
//         <div className="flex flex-wrap gap-2">
//           {MEDICATIONS.map(med => (
//             <button
//               key={med}
//               onClick={() => toggleMed(med)}
//               className={cn(
//                 'pill-badge text-xs',
//                 log.medications.includes(med)
//                   ? 'bg-sage text-sage-foreground'
//                   : 'glass-card text-foreground',
//               )}
//             >
//               {log.medications.includes(med) ? '✓ ' : ''}{med}
//             </button>
//           ))}
//         </div>
//       </GlassCard>

//       {/* Calories */}
//       <div className="grid grid-cols-2 gap-3">
//         <GlassCard className="text-center p-3">
//           <span className="text-xs text-muted-foreground">Daily Target</span>
//           <p className="text-lg font-bold">{tdee} cal</p>
//         </GlassCard>

//         <GlassCard className="text-center p-3">
//           <span className="text-xs text-muted-foreground">BMR</span>
//           <p className="text-lg font-bold">{bmr} cal</p>
//         </GlassCard>
//       </div>

//     </div>
//   );
// };

// export default DashboardPage;













// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import GlassCard from '@/components/ui/GlassCard';
// import ProgressBar3D from '@/components/ui/ProgressBar3D';
// import { cn } from '@/lib/utils';
// import { Clock, Footprints, Moon, Pill, Droplets } from 'lucide-react';

// import {
//   getProfile,
//   getTodayLog,
//   saveTodayLog,
//   getDayOfCycle,
//   getCyclePhase,
//   PHASE_LABELS,
//   calculateBMR,
//   calculateTDEE
// } from '@/lib/store';

// const DEFAULT_REMINDERS = [
//   { key: 'water', label: 'Drink Water', interval: 'Every 2 hours' },
//   { key: 'walk', label: '10-min Walk', interval: 'After meals' },
//   { key: 'stretch', label: 'Stretch Break', interval: 'Every 3 hours' },
//   { key: 'sleep', label: 'Sleep by 10 PM', interval: 'Daily' },
// ];

// const DEFAULT_MEDS = [
//   'Vitamin D',
//   'Iron',
//   'Inositol',
//   'Omega-3',
//   'Folic Acid',
//   'Zinc',
//   'Magnesium'
// ];

// const DashboardPage = () => {

//   const profile = getProfile()!;
//   const [log, setLog] = useState(getTodayLog());

//   const dayOfCycle = getDayOfCycle(profile.lastPeriodDate);
//   const phase = getCyclePhase(dayOfCycle, profile.cycleLength);

//   const bmr = calculateBMR(profile.weight, profile.height, profile.age);
//   const tdee = calculateTDEE(bmr, profile.activityLevel);

//   /* ---------------- MEDICATION STATE ---------------- */

//   const [medications, setMedications] = useState<string[]>(
//     JSON.parse(localStorage.getItem('aura_meds') || JSON.stringify(DEFAULT_MEDS))
//   );

//   const [newMed, setNewMed] = useState("");

//   useEffect(() => {
//     localStorage.setItem('aura_meds', JSON.stringify(medications));
//   }, [medications]);

//   const toggleMed = (med: string) => {
//     setLog(prev => ({
//       ...prev,
//       medications: prev.medications.includes(med)
//         ? prev.medications.filter(m => m !== med)
//         : [...prev.medications, med],
//     }));
//   };

//   /* ---------------- REMINDER STATE ---------------- */

//   const [reminders, setReminders] = useState<any[]>(
//     JSON.parse(localStorage.getItem('aura_reminders') || JSON.stringify(DEFAULT_REMINDERS))
//   );

//   const [newReminder, setNewReminder] = useState("");

//   useEffect(() => {
//     localStorage.setItem('aura_reminders', JSON.stringify(reminders));
//   }, [reminders]);

//   const toggleReminder = (key: string) => {
//     setReminders(prev =>
//       prev.map(r =>
//         r.key === key ? { ...r, active: !r.active } : r
//       )
//     );
//   };

//   /* ---------------- SAVE LOG ---------------- */

//   useEffect(() => {
//     saveTodayLog(log);
//   }, [log]);

//   /* ---------------- UI HELPERS ---------------- */

//   const greeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good Morning';
//     if (h < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-5">

//       {/* HEADER */}
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-2xl font-display text-foreground">
//           {greeting()}, {profile.name} 🌸
//         </h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Day {dayOfCycle} · <span className="font-semibold text-primary">
//             {PHASE_LABELS[phase]} Phase
//           </span>
//         </p>
//       </motion.div>

//       {/* PHASE CARD */}
//       <GlassCard tilt className="text-center">
//         <span className="text-sm text-muted-foreground">Current Phase</span>
//         <h2 className="text-xl font-bold capitalize text-primary">
//           {PHASE_LABELS[phase]}
//         </h2>
//          <p className="text-xs text-muted-foreground mt-1">
//            Take care of your body accordingly 💖
//        </p>

//         <ProgressBar3D
//           value={dayOfCycle}
//           max={profile.cycleLength}
//           color="bg-primary"
//           className="mt-3"
//           label={`Day ${dayOfCycle} of ${profile.cycleLength}`}
//         />
//       </GlassCard>

//       {/* SMART TIP */}
//       <GlassCard className="border-l-4 border-accent">
//         <p className="text-xs text-accent font-semibold mb-1">🧠 Smart Recommendation</p>
//         <p className="text-sm text-foreground">
//           Maintain hydration and light exercise for better hormonal balance.
//         </p>
//       </GlassCard>

//       {/* REMINDERS */}
//       <GlassCard>
//         <h3 className="text-lg mb-3">Reminders</h3>

//         {/* ADD REMINDER */}
//         <div className="flex gap-2 mb-3">
//           <input
//             value={newReminder}
//             onChange={(e) => setNewReminder(e.target.value)}
//             placeholder="Add reminder..."
//             className="soft-input text-xs px-2 py-1"
//           />
//           <button
//             onClick={() => {
//               if (!newReminder.trim()) return;
//               setReminders(prev => [
//                 ...prev,
//                 { key: Date.now().toString(), label: newReminder, active: true }
//               ]);
//               setNewReminder("");
//             }}
//             className="pill-badge bg-primary text-white text-xs"
//           >
//             Add
//           </button>
//         </div>

//         {reminders.map(r => (
//           <div key={r.key} className="flex items-center justify-between mb-2">

//             <span className="text-sm">{r.label}</span>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => toggleReminder(r.key)}
//                 className={cn(
//                   'px-2 py-1 text-xs rounded',
//                   r.active ? 'bg-primary text-white' : 'bg-muted'
//                 )}
//               >
//                 {r.active ? 'ON' : 'OFF'}
//               </button>

//               <button
//                 onClick={() =>
//                   setReminders(prev => prev.filter(x => x.key !== r.key))
//                 }
//                 className="text-red-400 text-xs"
//               >
//                 ✕
//               </button>
//             </div>

//           </div>
//         ))}
//       </GlassCard>

//       {/* MEDICATION */}
//       <GlassCard>
//         <h3 className="flex items-center gap-2 mb-3">
//           <Pill size={18} /> Medication Tracker
//         </h3>

//         {/* ADD MED */}
//         <div className="flex gap-2 mb-3">
//           <input
//             value={newMed}
//             onChange={(e) => setNewMed(e.target.value)}
//             placeholder="Add medicine..."
//             className="soft-input text-xs px-2 py-1"
//           />
//           <button
//             onClick={() => {
//               if (!newMed.trim()) return;
//               setMedications(prev => [...prev, newMed]);
//               setNewMed("");
//             }}
//             className="pill-badge bg-primary text-white text-xs"
//           >
//             Add
//           </button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {medications.map(med => (
//             <div key={med} className="flex items-center gap-1">

//               <button
//                 onClick={() => toggleMed(med)}
//                 className={cn(
//                   'pill-badge text-xs',
//                   log.medications.includes(med)
//                     ? 'bg-sage text-white'
//                     : 'glass-card'
//                 )}
//               >
//                 {log.medications.includes(med) ? '✓ ' : ''}{med}
//               </button>

//               <button
//                 onClick={() =>
//                   setMedications(prev => prev.filter(m => m !== med))
//                 }
//                 className="text-red-400 text-xs"
//               >
//                 ✕
//               </button>

//             </div>
//           ))}
//         </div>
//       </GlassCard>

//       {/* CALORIES */}
//       <div className="grid grid-cols-2 gap-3">
//         <GlassCard className="text-center p-3">
//           <span className="text-xs">Daily Target</span>
//           <p className="text-lg font-bold">{tdee} cal</p>
//         </GlassCard>

//         <GlassCard className="text-center p-3">
//           <span className="text-xs">BMR</span>
//           <p className="text-lg font-bold">{bmr} cal</p>
//         </GlassCard>
//       </div>

//     </div>
//   );
// };

// export default DashboardPage;





import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import { cn } from '@/lib/utils';
import { Clock, Footprints, Moon, Pill, Droplets, Plus, X } from 'lucide-react';

import {
  getProfile,
  getTodayLog,
  saveTodayLog,
  getDayOfCycle,
  getCyclePhase,
  PHASE_LABELS,
  calculateBMR,
  calculateTDEE
} from '@/lib/store';



const DashboardPage = () => {
  const profile = getProfile()!;
  const [log, setLog] = useState(getTodayLog());

  const dayOfCycle = getDayOfCycle(profile.lastPeriodDate);
  const phase = getCyclePhase(dayOfCycle, profile.cycleLength);

  /* ---------------- REMINDERS ---------------- */

  const REMINDERS = [
    { key: 'water', icon: Droplets, label: 'Drink Water', interval: 'Every 2 hours', color: 'text-sage' },
    { key: 'walk', icon: Footprints, label: '10-min Walk', interval: 'After meals', color: 'text-primary' },
    { key: 'stretch', icon: Clock, label: 'Stretch Break', interval: 'Every 3 hours', color: 'text-accent' },
    { key: 'sleep', icon: Moon, label: 'Sleep by 10 PM', interval: 'Daily', color: 'text-secondary' },
  ];

  const [activeReminders, setActiveReminders] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('aura_reminders') || '["water","walk","stretch","sleep"]'))
  );

  const toggleReminder = (key: string) => {
    setActiveReminders(prev => {
      const updated = new Set(prev);
      updated.has(key) ? updated.delete(key) : updated.add(key);
      localStorage.setItem('aura_reminders', JSON.stringify([...updated]));
      return updated;
    });
  };

  /* ---------------- MEDICATION SYSTEM ---------------- */

  const defaultMeds = ['Vitamin D', 'Iron', 'Inositol', 'Omega-3', 'Folic Acid'];

  const [medList, setMedList] = useState<string[]>(
    JSON.parse(localStorage.getItem('aura_meds') || JSON.stringify(defaultMeds))
  );

  const [newMed, setNewMed] = useState('');

  const addMedication = () => {
    if (!newMed.trim()) return;
    const updated = [...medList, newMed.trim()];
    setMedList(updated);
    localStorage.setItem('aura_meds', JSON.stringify(updated));
    setNewMed('');
  };

  const removeMedication = (med: string) => {
    const updated = medList.filter(m => m !== med);
    setMedList(updated);
    localStorage.setItem('aura_meds', JSON.stringify(updated));
  };

  const toggleMed = (med: string) => {
    setLog(prev => ({
      ...prev,
      medications: prev.medications.includes(med)
        ? prev.medications.filter(m => m !== med)
        : [...prev.medications, med],
    }));
  };

  /* ---------------- CALCULATIONS ---------------- */

  const bmr = calculateBMR(profile.weight, profile.height, profile.age);
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  useEffect(() => {
    saveTodayLog(log);
  }, [log]);

  /* ---------------- UI HELPERS ---------------- */

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-5">

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground">
          {greeting()}, {profile.name} 🌸
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Day {dayOfCycle} · <span className="font-semibold text-primary">{PHASE_LABELS[phase]} Phase</span>
        </p>
      </motion.div>

      {/* Phase Card */}
      <GlassCard tilt className="text-center">
        <span className="text-sm text-muted-foreground">Current Phase</span>
        <h2 className="text-xl font-bold capitalize text-primary">
          {PHASE_LABELS[phase]}
        </h2>

        <ProgressBar3D
          value={dayOfCycle}
          max={profile.cycleLength}
          label={`Day ${dayOfCycle} of ${profile.cycleLength}`}
          className="mt-3"
        />
      </GlassCard>

      {/* Smart Recommendation */}
      <GlassCard className="border-l-4 border-accent">
        <p className="text-xs text-accent font-semibold mb-1">🧠 Smart Recommendation</p>
        <p className="text-sm text-foreground">
          Based on your cycle phase, light exercise + hydration will improve hormonal balance today.
        </p>
      </GlassCard>

      



      {/* Reminders */}
      <GlassCard>
        <h3 className="font-display text-lg mb-3">Reminders</h3>

        {REMINDERS.map(({ key, icon: Icon, label, interval, color }) => (
          <div key={key} className="flex items-center gap-3 mb-2">
            <Icon size={18} className={color} />

            <div className="flex-1">
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-[10px] text-muted-foreground">{interval}</p>
            </div>

            <button
              onClick={() => toggleReminder(key)}
              className={cn(
                'w-12 h-6 rounded-full relative',
                activeReminders.has(key) ? 'bg-primary' : 'bg-muted'
              )}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                animate={{ left: activeReminders.has(key) ? 26 : 2 }}
              />
            </button>
          </div>
        ))}
      </GlassCard>

      {/* Medication Tracker */}
      <GlassCard>
        <h3 className="font-display text-lg flex items-center gap-2 mb-3">
          <Pill size={18} /> Medication Tracker
        </h3>

        {/* Add new med */}
        <div className="flex gap-2 mb-3">
          <input
            value={newMed}
            onChange={(e) => setNewMed(e.target.value)}
            placeholder="Add medicine..."
            className="flex-1 px-3 py-1 text-sm rounded border"
          />
          <button
            onClick={addMedication}
            className="bg-primary text-white px-3 rounded"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Med list */}
        <div className="flex flex-wrap gap-2">
          {medList.map(med => (
            <div key={med} className="flex items-center gap-1">
              <button
                onClick={() => toggleMed(med)}
                className={cn(
                  'pill-badge text-xs',
                  log.medications.includes(med)
                    ? 'bg-sage text-white'
                    : 'glass-card'
                )}
              >
                {log.medications.includes(med) ? '✓ ' : ''}{med}
              </button>

              <button
                onClick={() => removeMedication(med)}
                className="text-red-400"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Calories */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="text-center p-3">
          <span className="text-xs text-muted-foreground">Daily Target</span>
          <p className="text-lg font-bold">{tdee} cal</p>
        </GlassCard>

        <GlassCard className="text-center p-3">
          <span className="text-xs text-muted-foreground">BMR</span>
          <p className="text-lg font-bold">{bmr} cal</p>
        </GlassCard>
      </div>

    </div>
  );
};

export default DashboardPage;