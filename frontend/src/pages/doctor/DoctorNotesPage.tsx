import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { FileText, ChevronRight, Search } from 'lucide-react';
import { MOCK_PATIENTS } from './DoctorPatientsPage';

const DoctorNotesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const patientsWithNotes = MOCK_PATIENTS.map(p => {
    const notes = JSON.parse(localStorage.getItem(`doctor_notes_${p.id}`) || '[]');
    return { ...p, noteCount: notes.length, lastNote: notes[0] || null };
  }).filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground">Doctor Notes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Patient notes & prescriptions</p>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search patient..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Patient Note Cards */}
      <div className="space-y-3">
        {patientsWithNotes.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => navigate(`/doctor/patients/${p.id}`)}
            className="glass-card glass-card-hover p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                style={{ background: 'var(--rose-gradient)' }}>
                {p.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                {p.lastNote ? (
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    Last note: {p.lastNote.date} — {p.lastNote.note || p.lastNote.diet || p.lastNote.medication || '—'}
                  </p>
                ) : (
                  <p className="text-[11px] text-muted-foreground mt-0.5">No notes yet</p>
                )}
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-xs text-primary">
                  <FileText size={12} /> {p.noteCount}
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {patientsWithNotes.length === 0 && (
        <div className="text-center py-10 text-muted-foreground text-sm">No patients found</div>
      )}

    </div>
  );
};

export default DoctorNotesPage;
