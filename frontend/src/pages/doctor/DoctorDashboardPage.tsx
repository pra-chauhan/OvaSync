import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Users, UserPlus, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';

// Mock patient data — replace with real API
const MOCK_PATIENTS = [
  { id: '1', name: 'Ananya Sharma', age: 24, lastVisit: '2026-05-02', pcosRisk: 'high', newPatient: false },
  { id: '2', name: 'Ritu Gupta', age: 28, lastVisit: '2026-05-04', pcosRisk: 'medium', newPatient: true },
  { id: '3', name: 'Meera Patel', age: 31, lastVisit: '2026-04-28', pcosRisk: 'low', newPatient: false },
  { id: '4', name: 'Sneha Verma', age: 22, lastVisit: '2026-05-05', pcosRisk: 'high', newPatient: true },
  { id: '5', name: 'Priya Nair', age: 26, lastVisit: '2026-04-20', pcosRisk: 'medium', newPatient: false },
];

const riskColor = (r: string) =>
  r === 'high' ? 'text-destructive bg-destructive/10' :
  r === 'medium' ? 'text-accent bg-accent/10' :
  'text-sage bg-sage/10';

const DoctorDashboardPage = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem('doctor_auth') || '{}');

  const total = MOCK_PATIENTS.length;
  const newCount = MOCK_PATIENTS.filter(p => p.newPatient).length;
  const highRisk = MOCK_PATIENTS.filter(p => p.pcosRisk === 'high').length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    { label: 'Total Patients', value: total, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'New Patients', value: newCount, icon: UserPlus, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'High Risk PCOS', value: highRisk, icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground">
          {greeting()}, {doctor.name || 'Doctor'} 👩‍⚕️
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Patient Overview Dashboard</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="text-center p-3">
              <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-xl font-bold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* AI Insight */}
      <GlassCard className="border-l-4 border-primary">
        <p className="text-xs text-primary font-semibold mb-1">🧠 AI Clinical Insight</p>
        <p className="text-sm text-foreground">
          {highRisk} patients are flagged as high-risk for PCOS. Consider scheduling follow-up consultations this week.
        </p>
      </GlassCard>

      {/* Recent Patients */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-foreground">Recent Patients</h3>
          <button
            onClick={() => navigate('/doctor/patients')}
            className="flex items-center gap-1 text-xs text-primary"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>

        <div className="space-y-3">
          {MOCK_PATIENTS.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              onClick={() => navigate(`/doctor/patients/${p.id}`)}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition-all cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm text-white flex-shrink-0"
                style={{ background: 'var(--rose-gradient)' }}>
                {p.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  {p.name}
                  {p.newPatient && (
                    <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">NEW</span>
                  )}
                </p>
                <p className="text-[11px] text-muted-foreground">Age {p.age} · Last visit {p.lastVisit}</p>
              </div>

              <span className={`text-[10px] px-2 py-1 rounded-full font-semibold capitalize ${riskColor(p.pcosRisk)}`}>
                {p.pcosRisk}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Trend */}
      <GlassCard className="border-l-4 border-accent">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-accent" />
          <p className="text-xs text-accent font-semibold">Monthly Trend</p>
        </div>
        <p className="text-sm text-foreground">
          PCOS detections up <strong>12%</strong> this month. High-risk patients mostly aged 22–28.
        </p>
      </GlassCard>

    </div>
  );
};

export default DoctorDashboardPage;
