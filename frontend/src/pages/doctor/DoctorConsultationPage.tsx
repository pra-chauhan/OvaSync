import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Video, Plus, ChevronDown, ChevronUp, Clock, X, Check } from 'lucide-react';

const MOCK_PATIENTS = [
  { id: '1', name: 'Ananya Sharma', age: 24 },
  { id: '2', name: 'Ritu Gupta', age: 28 },
  { id: '3', name: 'Meera Patel', age: 31 },
  { id: '4', name: 'Sneha Verma', age: 22 },
  { id: '5', name: 'Priya Nair', age: 26 },
];

const TYPE_ICON: Record<string, any> = {
  call: Phone,
  video: Video,
  chat: MessageCircle,
  visit: Clock,
};
const TYPE_COLOR: Record<string, string> = {
  call: 'text-blue-500 bg-blue-50',
  video: 'text-purple-500 bg-purple-50',
  chat: 'text-primary bg-primary/10',
  visit: 'text-accent bg-accent/10',
};

// Pre-fill with some demo history
const DEMO_HISTORY: Record<string, any[]> = {
  '1': [
    { id: 'h1', type: 'video', date: '2026-05-02', time: '10:00 AM', duration: '25 mins', summary: 'Discussed irregular cycle, reviewed PCOS symptoms. Prescribed Metformin. Follow-up in 2 weeks.' },
    { id: 'h2', type: 'chat', date: '2026-04-20', time: '03:30 PM', duration: '10 mins', summary: 'Patient asked about diet plan. Advised low GI foods and daily walk.' },
    { id: 'h3', type: 'visit', date: '2026-04-10', time: '11:00 AM', duration: '30 mins', summary: 'First consultation. Blood tests ordered. Lifestyle counseling done.' },
  ],
  '2': [
    { id: 'h4', type: 'call', date: '2026-05-04', time: '02:00 PM', duration: '15 mins', summary: 'Follow-up call. Symptoms slightly improved. Continue current medication.' },
  ],
  '4': [
    { id: 'h5', type: 'visit', date: '2026-05-05', time: '09:00 AM', duration: '40 mins', summary: 'New patient intake. High PCOS probability (92%). Detailed examination done. Started treatment plan.' },
  ],
};

const DoctorConsultationPage = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ type: 'call', date: '', time: '', duration: '', summary: '' });
  const [saved, setSaved] = useState(false);

  // Load history from localStorage or demo
  const getHistory = (pid: string) => {
    const stored = localStorage.getItem(`consultation_${pid}`);
    if (stored) return JSON.parse(stored);
    return DEMO_HISTORY[pid] || [];
  };

  const [histories, setHistories] = useState<Record<string, any[]>>(() => {
    const h: Record<string, any[]> = {};
    MOCK_PATIENTS.forEach(p => { h[p.id] = getHistory(p.id); });
    return h;
  });

  const addConsultation = () => {
    if (!selectedPatient || !form.date || !form.summary) return;
    const entry = { id: Date.now().toString(), ...form };
    const updated = [entry, ...(histories[selectedPatient] || [])];
    setHistories(prev => ({ ...prev, [selectedPatient]: updated }));
    localStorage.setItem(`consultation_${selectedPatient}`, JSON.stringify(updated));
    setForm({ type: 'call', date: '', time: '', duration: '', summary: '' });
    setShowAddForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40";
  const patient = MOCK_PATIENTS.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display text-foreground">Consultation History</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Calls, chats & visit records per patient</p>
      </motion.div>

      {/* Patient Selector */}
      <GlassCard>
        <h3 className="font-display text-sm text-muted-foreground mb-3">Select Patient</h3>
        <div className="space-y-2">
          {MOCK_PATIENTS.map(p => {
            const count = histories[p.id]?.length || 0;
            const last = histories[p.id]?.[0];
            const isOpen = selectedPatient === p.id;

            return (
              <div key={p.id}>
                <motion.div
                  onClick={() => setSelectedPatient(isOpen ? null : p.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${isOpen ? 'bg-primary/10' : 'bg-white/30 hover:bg-white/50'}`}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--rose-gradient)' }}>
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {count} consultation{count !== 1 ? 's' : ''}{last ? ` · Last: ${last.date}` : ''}
                    </p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </motion.div>

                {/* Expanded History */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pt-2 space-y-2">

                        {/* Add New Button */}
                        <button
                          onClick={() => setShowAddForm(s => !s)}
                          className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-all"
                        >
                          <Plus size={13} /> Add Consultation Record
                        </button>

                        {/* Add Form */}
                        <AnimatePresence>
                          {showAddForm && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="glass-card p-3 space-y-2"
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] text-muted-foreground mb-1 block">Type</label>
                                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className={inputClass}>
                                    <option value="call">📞 Call</option>
                                    <option value="video">🎥 Video</option>
                                    <option value="chat">💬 Chat</option>
                                    <option value="visit">🏥 Visit</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[10px] text-muted-foreground mb-1 block">Date</label>
                                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputClass} />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] text-muted-foreground mb-1 block">Time</label>
                                  <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className={inputClass} />
                                </div>
                                <div>
                                  <label className="text-[10px] text-muted-foreground mb-1 block">Duration</label>
                                  <input placeholder="e.g. 20 mins" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className={inputClass} />
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] text-muted-foreground mb-1 block">Summary / What was discussed</label>
                                <textarea rows={3} placeholder="Symptoms discussed, advice given, medication prescribed..." value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} className={`${inputClass} resize-none`} />
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1 text-xs h-8" style={{ background: 'var(--rose-gradient)' }} onClick={addConsultation}>
                                  <Check size={12} className="mr-1" /> Save
                                </Button>
                                <Button variant="outline" className="flex-1 text-xs h-8" onClick={() => setShowAddForm(false)}>
                                  <X size={12} className="mr-1" /> Cancel
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* History Entries */}
                        {(histories[p.id] || []).map((h, idx) => {
                          const Icon = TYPE_ICON[h.type] || MessageCircle;
                          return (
                            <motion.div
                              key={h.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="glass-card p-3"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${TYPE_COLOR[h.type]}`}>
                                  <Icon size={13} />
                                </div>
                                <div className="flex-1">
                                  <span className="text-xs font-semibold capitalize text-foreground">{h.type}</span>
                                  <span className="text-[11px] text-muted-foreground ml-2">{h.date}{h.time ? ` · ${h.time}` : ''}{h.duration ? ` · ${h.duration}` : ''}</span>
                                </div>
                              </div>
                              <p className="text-xs text-foreground leading-relaxed pl-9">{h.summary}</p>
                            </motion.div>
                          );
                        })}

                        {(histories[p.id] || []).length === 0 && (
                          <p className="text-center text-xs text-muted-foreground py-3">No consultations recorded yet</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {saved && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-4 py-2 rounded-full shadow-lg z-50">
          ✓ Consultation saved!
        </motion.div>
      )}

    </div>
  );
};

export default DoctorConsultationPage;
