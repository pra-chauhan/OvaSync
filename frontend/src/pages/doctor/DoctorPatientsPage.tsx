import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';

const MOCK_PATIENTS = [
  {
    id: '1', name: 'Ananya Sharma', age: 24, lastVisit: '2026-05-02',
    pcosRisk: 'high', newPatient: false,
    cycleHistory: 'Irregular (45-day cycle)', symptoms: ['Hair loss', 'Acne', 'Weight gain'],
    lifestyle: 'Sedentary, high fast food intake', prediction: 'PCOS Detected (87%)',
  },
  {
    id: '2', name: 'Ritu Gupta', age: 28, lastVisit: '2026-05-04',
    pcosRisk: 'medium', newPatient: true,
    cycleHistory: 'Slightly irregular (32-day)', symptoms: ['Fatigue', 'Mild acne'],
    lifestyle: 'Moderate exercise, balanced diet', prediction: 'PCOS Risk Moderate (54%)',
  },
  {
    id: '3', name: 'Meera Patel', age: 31, lastVisit: '2026-04-28',
    pcosRisk: 'low', newPatient: false,
    cycleHistory: 'Regular (28-day cycle)', symptoms: ['None reported'],
    lifestyle: 'Active, healthy diet', prediction: 'Low Risk (18%)',
  },
  {
    id: '4', name: 'Sneha Verma', age: 22, lastVisit: '2026-05-05',
    pcosRisk: 'high', newPatient: true,
    cycleHistory: 'Very irregular (60+ days)', symptoms: ['Severe acne', 'Hair loss', 'Obesity'],
    lifestyle: 'No exercise, very high sugar intake', prediction: 'PCOS Detected (92%)',
  },
  {
    id: '5', name: 'Priya Nair', age: 26, lastVisit: '2026-04-20',
    pcosRisk: 'medium', newPatient: false,
    cycleHistory: 'Mild irregularity (35-day)', symptoms: ['Fatigue', 'Bloating'],
    lifestyle: 'Light exercise, average diet', prediction: 'PCOS Risk Moderate (61%)',
  },
];

const riskColor = (r: string) =>
  r === 'high' ? 'text-destructive bg-destructive/10' :
  r === 'medium' ? 'text-accent bg-accent/10' :
  'text-green-600 bg-green-100';

const DoctorPatientsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low' | 'new'>('all');

  const filtered = MOCK_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ? true :
      filter === 'new' ? p.newPatient :
      p.pcosRisk === filter;
    return matchSearch && matchFilter;
  });

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'high', label: 'High Risk' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low Risk' },
  ];

  return (
    <div className="space-y-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground">Patient List</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{MOCK_PATIENTS.length} total patients</p>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search patients..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === key
                ? 'bg-primary text-white shadow-sm'
                : 'glass-card text-muted-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Patient Cards */}
      <div className="space-y-3">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => navigate(`/doctor/patients/${p.id}`)}
            className="glass-card glass-card-hover p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ background: 'var(--rose-gradient)' }}>
                {p.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  {p.newPatient && (
                    <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Age {p.age} · Last visit {p.lastVisit}</p>
                <p className="text-[11px] text-muted-foreground">{p.cycleHistory}</p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${riskColor(p.pcosRisk)}`}>
                  {p.pcosRisk} risk
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No patients found
          </div>
        )}
      </div>
    </div>
  );
};

export { MOCK_PATIENTS };
export default DoctorPatientsPage;
