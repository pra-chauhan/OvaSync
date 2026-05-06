import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import ProgressBar3D from '@/components/ui/ProgressBar3D';
import { ArrowLeft, Activity, Leaf, Brain, FileText, Pencil } from 'lucide-react';
import { MOCK_PATIENTS } from './DoctorPatientsPage';

const riskColor = (r: string) =>
  r === 'high' ? 'text-destructive' :
  r === 'medium' ? 'text-accent' : 'text-green-600';

const DoctorPatientProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = MOCK_PATIENTS.find(p => p.id === id);

  const [activeTab, setActiveTab] = useState<'overview' | 'notes'>('overview');

  if (!patient) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Patient not found.{' '}
        <span className="text-primary cursor-pointer" onClick={() => navigate('/doctor/patients')}>Go back</span>
      </div>
    );
  }

  const probabilityNum = parseInt(patient.prediction.match(/\d+/)?.[0] || '0');

  return (
    <div className="space-y-4">

      {/* Back + Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate('/doctor/patients')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back to Patients
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
            style={{ background: 'var(--rose-gradient)' }}>
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-display text-foreground">{patient.name}</h1>
            <p className="text-sm text-muted-foreground">Age {patient.age} · Last visit {patient.lastVisit}</p>
          </div>
        </div>
      </motion.div>

      {/* PCOS Prediction Card */}
      <GlassCard tilt className="text-center">
        <p className="text-xs text-muted-foreground mb-1">PCOS Prediction</p>
        <p className={`text-xl font-bold ${riskColor(patient.pcosRisk)}`}>{patient.prediction}</p>
        <ProgressBar3D
          value={probabilityNum}
          max={100}
          color={patient.pcosRisk === 'high' ? 'bg-destructive' : patient.pcosRisk === 'medium' ? 'bg-accent' : 'bg-green-500'}
          label={`${probabilityNum}% probability`}
          className="mt-3"
        />
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['overview', 'notes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              activeTab === tab
                ? 'bg-primary text-white shadow-sm'
                : 'glass-card text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* Personal Info */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-primary" />
              <h3 className="font-display text-base text-foreground">Personal Info</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'Name', value: patient.name },
                { label: 'Age', value: patient.age },
                { label: 'PCOS Risk', value: patient.pcosRisk.toUpperCase() },
                { label: 'Last Visit', value: patient.lastVisit },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground capitalize">{value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Cycle History */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={16} className="text-primary" />
              <h3 className="font-display text-base text-foreground">Cycle History</h3>
            </div>
            <p className="text-sm text-foreground">{patient.cycleHistory}</p>
          </GlassCard>

          {/* Symptoms */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={16} className="text-primary" />
              <h3 className="font-display text-base text-foreground">Symptoms Logged</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {patient.symptoms.map(s => (
                <span key={s} className="text-xs px-3 py-1 rounded-full glass-card text-foreground">
                  {s}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Lifestyle */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-accent" />
              <h3 className="font-display text-base text-foreground">Lifestyle Data</h3>
            </div>
            <p className="text-sm text-foreground">{patient.lifestyle}</p>
          </GlassCard>

          <Button
            className="w-full"
            style={{ background: 'var(--rose-gradient)' }}
            onClick={() => setActiveTab('notes')}
          >
            <Pencil size={16} className="mr-2" /> Write Doctor Notes
          </Button>

        </motion.div>
      )}

      {activeTab === 'notes' && (
        <DoctorNotesTab patientId={patient.id} patientName={patient.name} />
      )}

    </div>
  );
};

// ─── Doctor Notes Tab ───────────────────────────────────────
const DoctorNotesTab = ({ patientId, patientName }: { patientId: string; patientName: string }) => {
  const storageKey = `doctor_notes_${patientId}`;
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const [notes, setNotes] = useState<any[]>(stored);
  const [form, setForm] = useState({
    note: '',
    diet: '',
    medication: '',
  });
  const [saved, setSaved] = useState(false);

  const saveNote = () => {
    if (!form.note.trim() && !form.diet.trim() && !form.medication.trim()) return;
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN'),
      note: form.note,
      diet: form.diet,
      medication: form.medication,
    };
    const updated = [entry, ...notes];
    setNotes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setForm({ note: '', diet: '', medication: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const textareaClass = "w-full px-3 py-2.5 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none";

  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      {/* Write Note */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-primary" />
          <h3 className="font-display text-base text-foreground">New Note for {patientName}</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Clinical Notes</label>
            <textarea
              rows={3}
              placeholder="Write your observations..."
              value={form.note}
              onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
              className={textareaClass}
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Prescribe — Diet Plan</label>
            <textarea
              rows={2}
              placeholder="e.g. Low GI diet, avoid sugar, high fiber..."
              value={form.diet}
              onChange={e => setForm(p => ({ ...p, diet: e.target.value }))}
              className={textareaClass}
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Prescribe — Medications</label>
            <textarea
              rows={2}
              placeholder="e.g. Metformin 500mg, Inositol, Vitamin D..."
              value={form.medication}
              onChange={e => setForm(p => ({ ...p, medication: e.target.value }))}
              className={textareaClass}
            />
          </div>

          <Button
            className="w-full"
            style={{ background: 'var(--rose-gradient)' }}
            onClick={saveNote}
          >
            {saved ? '✓ Saved!' : 'Save Note'}
          </Button>
        </div>
      </GlassCard>

      {/* Past Notes */}
      {notes.length > 0 && (
        <GlassCard>
          <h3 className="font-display text-base text-foreground mb-3">Past Notes</h3>
          <div className="space-y-3">
            {notes.map(n => (
              <div key={n.id} className="p-3 rounded-xl bg-white/40 border border-border/40">
                <p className="text-[11px] text-muted-foreground mb-2">{n.date}</p>
                {n.note && <p className="text-sm text-foreground mb-1"><strong>Note:</strong> {n.note}</p>}
                {n.diet && <p className="text-sm text-foreground mb-1"><strong>Diet:</strong> {n.diet}</p>}
                {n.medication && <p className="text-sm text-foreground"><strong>Meds:</strong> {n.medication}</p>}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

    </motion.div>
  );
};

export default DoctorPatientProfilePage;
