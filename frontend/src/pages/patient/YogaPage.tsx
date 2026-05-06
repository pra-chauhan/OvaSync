// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import GlassCard from '@/components/ui/GlassCard';
// import { Button } from '@/components/ui/button';
// import { YOGA_ASANAS, PRANAYAM_TECHNIQUES, STRESS_ASANAS, DESK_STRETCHES } from '@/lib/data';
// import { cn } from '@/lib/utils';
// import { Heart, Play, Pause, RotateCcw, Timer } from 'lucide-react';

// const TABS = ['Asanas', 'Pranayam', 'Stress Relief', 'Desk Stretch', 'Timer'];

// const YogaPage = () => {
//   const [tab, setTab] = useState(0);
//   const [timerSeconds, setTimerSeconds] = useState(300); 
//   const [timerRunning, setTimerRunning] = useState(false);
//   const [timerPreset, setTimerPreset] = useState(300);
//   const intervalRef = useRef<ReturnType<typeof setInterval>>();

//   useEffect(() => {
//     if (timerRunning && timerSeconds > 0) {
//       intervalRef.current = setInterval(() => setTimerSeconds(s => s - 1), 1000);
//     } else {
//       clearInterval(intervalRef.current);
//       if (timerSeconds === 0) setTimerRunning(false);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [timerRunning, timerSeconds]);

//   const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

//   return (
//     <div className="space-y-5">
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//         <h1 className="text-2xl font-display text-foreground flex items-center gap-2">
//           <Heart className="text-primary" size={24} /> Yoga & Pranayam
//         </h1>
//       </motion.div>

//       {/* Tab Bar */}
//       <div className="flex gap-1 overflow-x-auto pb-1 glass-card p-1">
//         {TABS.map((t, i) => (
//           <button
//             key={t}
//             onClick={() => setTab(i)}
//             className={cn(
//               'pill-badge whitespace-nowrap text-xs transition-all flex-shrink-0',
//               tab === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
//             )}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

     
//       {tab === 0 && (
//         <div className="space-y-3">
//           <p className="text-sm font-body text-muted-foreground">6 key PCOS-healing asanas</p>
//           {YOGA_ASANAS.map((asana, i) => (
//             <motion.div key={asana.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
//               <GlassCard tilt>
//                 <div className="flex items-start gap-3">
//                   <span className="text-2xl">🧘‍♀️</span>
//                   <div className="flex-1">
//                     <h4 className="font-display text-sm text-foreground">{asana.name}</h4>
//                     <p className="text-[10px] font-body text-primary">{asana.english} · {asana.duration}</p>
//                     <p className="text-xs font-body text-muted-foreground mt-1">{asana.benefit}</p>
//                     <p className="text-xs font-body text-foreground mt-1 leading-relaxed">{asana.instruction}</p>
//                   </div>
//                 </div>
//               </GlassCard>
//             </motion.div>
//           ))}
//         </div>
//       )}

     
//       {tab === 1 && (
//         <div className="space-y-3">
//           <p className="text-sm font-body text-muted-foreground">4 breathing techniques for hormonal balance</p>
//           {PRANAYAM_TECHNIQUES.map((p, i) => (
//             <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
//               <GlassCard tilt>
//                 <div className="flex items-start gap-3">
//                   <span className="text-2xl">🌬️</span>
//                   <div className="flex-1">
//                     <h4 className="font-display text-sm text-foreground">{p.name}</h4>
//                     <p className="text-[10px] font-body text-primary">{p.english} · {p.duration}</p>
//                     <p className="text-xs font-body text-muted-foreground mt-1">{p.benefit}</p>
//                     <p className="text-xs font-body text-foreground mt-1 leading-relaxed">{p.instruction}</p>
//                   </div>
//                 </div>
//               </GlassCard>
//             </motion.div>
//           ))}
//         </div>
//       )}

    
//       {tab === 2 && (
//         <div className="space-y-3">
//           <p className="text-sm font-body text-muted-foreground">Calming poses for stress management</p>
//           {STRESS_ASANAS.map((a, i) => (
//             <GlassCard key={a.name} tilt>
//               <h4 className="font-display text-sm text-foreground">{a.name} ({a.english})</h4>
//               <p className="text-[10px] font-body text-primary">{a.duration}</p>
//               <p className="text-xs font-body text-muted-foreground mt-1">{a.benefit}</p>
//             </GlassCard>
//           ))}
//         </div>
//       )}

      
//       {tab === 3 && (
//         <div className="space-y-3">
//           <GlassCard className="border-l-4 border-accent">
//             <h3 className="font-display text-base text-foreground">5-Min Desk Stretch Session ⏰</h3>
//             <p className="text-xs font-body text-muted-foreground">Perfect between work breaks</p>
//           </GlassCard>
//           {DESK_STRETCHES.map((s, i) => (
//             <GlassCard key={s.name}>
//               <div className="flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-body">
//                   {i + 1}
//                 </span>
//                 <div>
//                   <h4 className="font-body text-sm font-semibold text-foreground">{s.name} ({s.duration})</h4>
//                   <p className="text-xs font-body text-muted-foreground">{s.instruction}</p>
//                 </div>
//               </div>
//             </GlassCard>
//           ))}
//         </div>
//       )}

     
//       {tab === 4 && (
//         <div className="space-y-4">
//           <GlassCard className="text-center py-8">
//             <Timer className="mx-auto text-primary mb-4" size={32} />
//             <div className="text-5xl font-display font-bold text-foreground mb-6">
//               {formatTime(timerSeconds)}
//             </div>
//             <div className="flex justify-center gap-3 mb-6">
//               {[120, 300, 600, 900].map(s => (
//                 <button
//                   key={s}
//                   onClick={() => { setTimerSeconds(s); setTimerPreset(s); setTimerRunning(false); }}
//                   className={cn(
//                     'pill-badge text-xs',
//                     timerPreset === s ? 'bg-primary text-primary-foreground' : 'glass-card text-foreground',
//                   )}
//                 >
//                   {s / 60}m
//                 </button>
//               ))}
//             </div>
           
//             <div className="relative w-32 h-32 mx-auto mb-4">
//               <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
//                 <circle
//                   cx="50" cy="50" r="45"
//                   fill="none"
//                   stroke="hsl(var(--primary))"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeDasharray={`${(timerSeconds / timerPreset) * 283} 283`}
//                   className="transition-all duration-1000"
//                 />
//               </svg>
//             </div>
//             <div className="flex justify-center gap-3">
//               <Button
//                 variant="rose"
//                 size="lg"
//                 onClick={() => setTimerRunning(!timerRunning)}
//               >
//                 {timerRunning ? <Pause size={18} /> : <Play size={18} />}
//                 {timerRunning ? 'Pause' : 'Start'}
//               </Button>
//               <Button
//                 variant="glass"
//                 size="lg"
//                 onClick={() => { setTimerSeconds(timerPreset); setTimerRunning(false); }}
//               >
//                 <RotateCcw size={18} /> Reset
//               </Button>
//             </div>
//           </GlassCard>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YogaPage;


import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import { Button } from '@/components/ui/button';
import {
  YOGA_ASANAS,
  PRANAYAM_TECHNIQUES,
  STRESS_ASANAS,
  DESK_STRETCHES,
  EXERCISES
} from '@/lib/data';
import {
  getProfile,
  getDayOfCycle,
  getCyclePhase,
  getTodayLog,
  saveTodayLog,
  getLogs
} from '@/lib/store';
import { cn } from '@/lib/utils';

import {
  Heart,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Dumbbell,
  Flame,
  CheckCircle2,
  Trophy
} from 'lucide-react';

const TABS = ['Asanas', 'Pranayam', 'Stress Relief', 'Desk Stretch', 'Exercise', 'Timer'];

const YogaPage = () => {
  const [tab, setTab] = useState(0);

  /* ---------------- TIMER ---------------- */
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      intervalRef.current = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      if (timerSeconds === 0) setTimerRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning, timerSeconds]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  /* ---------------- EXERCISE LOGIC ---------------- */

  const profile = getProfile()!;
  const dayOfCycle = getDayOfCycle(profile.lastPeriodDate);
  const phase = getCyclePhase(dayOfCycle, profile.cycleLength);

  const [log, setLog] = useState(getTodayLog());

  const phaseExercises = EXERCISES.filter(e => e.phases.includes(phase));
  const restrictedExercises = EXERCISES.filter(e => !e.phases.includes(phase));

  const logs = getLogs();

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const dateStr = d.toISOString().split('T')[0];
    const dayLog = logs.find(l => l.date === dateStr);

    if (dayLog && dayLog.exerciseMinutes > 0) streak++;
    else if (i > 0) break;
  }

  const addExerciseMinutes = (mins: number) => {
    const newLog = {
      ...log,
      exerciseMinutes: log.exerciseMinutes + mins
    };
    setLog(newLog);
    saveTodayLog(newLog);
  };

  const typeColors = {
    cardio: 'text-primary',
    strength: 'text-accent',
    flexibility: 'text-sage',
    rest: 'text-secondary',
  };

  const typeIcons = {
    cardio: '🏃‍♀️',
    strength: '💪',
    flexibility: '🧘',
    rest: '😴',
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground flex items-center gap-2">
          <Heart className="text-primary" size={24} /> Fitness & Yoga
        </h1>
      </motion.div>

      {/* TAB BAR */}
      <div className="flex gap-1 overflow-x-auto pb-1 glass-card p-1">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={cn(
              'pill-badge whitespace-nowrap text-xs transition-all',
              tab === i
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ---------------- YOGA TABS ---------------- */}

      {tab === 0 && (
        <div className="space-y-3">
          {YOGA_ASANAS.map((asana, i) => (
            <motion.div key={asana.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard tilt>
                <h4 className="text-sm font-semibold">{asana.name}</h4>
                <p className="text-xs text-muted-foreground">{asana.benefit}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="space-y-3">
          {PRANAYAM_TECHNIQUES.map(p => (
            <GlassCard key={p.name}>{p.name}</GlassCard>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="space-y-3">
          {STRESS_ASANAS.map(a => (
            <GlassCard key={a.name}>{a.name}</GlassCard>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div className="space-y-3">
          {DESK_STRETCHES.map(s => (
            <GlassCard key={s.name}>{s.name}</GlassCard>
          ))}
        </div>
      )}

      {/* ---------------- 💪 EXERCISE TAB ---------------- */}

      {tab === 4 && (
        <div className="space-y-5">

          {/* Progress */}
          <GlassCard className="flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar3D
                value={log.exerciseMinutes}
                max={45}
                color="bg-primary"
                label="Today's Activity"
              />
            </div>
            <div className="text-center">
              <Flame className="text-primary mx-auto" size={20} />
              <span className="text-xs">{log.exerciseMinutes} min</span>
            </div>
          </GlassCard>

          {/* Streak */}
          <GlassCard className="flex items-center gap-3">
            <Trophy className="text-accent" />
            <p>{streak} Day Streak 🔥</p>
          </GlassCard>

          {/* Recommended */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Recommended for {phase} phase
            </h3>

            {phaseExercises.map(ex => (
              <GlassCard key={ex.name} className="flex items-center gap-3">
                <span>{typeIcons[ex.type]}</span>
                <div className="flex-1">
                  <p>{ex.name}</p>
                  <p className="text-[10px] font-body text-muted-foreground">
                    {ex.description}
                  </p>
                  <span className={typeColors[ex.type]}>
                    {ex.duration}
                  </span>
                </div>

                <button
                  onClick={() =>
                    addExerciseMinutes(parseInt(ex.duration) || 15)
                  }
                  className="pill-badge bg-primary text-white"
                >
                  Done
                </button>
              </GlassCard>
            ))}
          </div>

          {/* Weekly */}
          <GlassCard>
        <h3 className="font-display text-lg text-foreground mb-3">
          This Week
        </h3>

        <div className="flex gap-1.5">
          {Array.from({ length: 7 }, (_, i) => {

            const d = new Date();
            d.setDate(d.getDate() - (6 - i));

            const dateStr = d.toISOString().split('T')[0];
            const dayLog = logs.find(l => l.date === dateStr);

            const mins = dayLog?.exerciseMinutes || 0;

            const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

            return (
              <div key={i} className="flex-1 text-center">

                <div
                  className={cn(
                    'h-16 rounded-lg mb-1 flex items-end justify-center transition-all',
                    mins > 0 ? 'bg-primary/20' : 'bg-muted'
                  )}
                >
                  <div
                    className="w-full bg-primary rounded-lg transition-all"
                    style={{
                      height: `${Math.min(100, (mins / 45) * 100)}%`
                    }}
                  />
                </div>

                <span className="text-[10px] font-body text-muted-foreground">
                  {dayNames[d.getDay()]}
                </span>

              </div>
            );
          })}
        </div>
      </GlassCard>

        </div>
      )}

      {/* ---------------- TIMER ---------------- */}

      {tab === 5 && (
        <GlassCard className="text-center py-8">
          <Timer size={30} className="mx-auto mb-4" />
          <h2 className="text-3xl mb-4">{formatTime(timerSeconds)}</h2>

          <Button onClick={() => setTimerRunning(!timerRunning)}>
            {timerRunning ? 'Pause' : 'Start'}
          </Button>
        </GlassCard>
      )}
    </div>
  );
};

export default YogaPage;