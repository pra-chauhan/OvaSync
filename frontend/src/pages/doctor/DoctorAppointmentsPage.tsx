import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Check, X, ChevronRight, User } from 'lucide-react';

const MOCK_PATIENTS = [
  { id: '1', name: 'Ananya Sharma', age: 24, pcosRisk: 'high' },
  { id: '2', name: 'Ritu Gupta', age: 28, pcosRisk: 'medium' },
  { id: '3', name: 'Meera Patel', age: 31, pcosRisk: 'low' },
  { id: '4', name: 'Sneha Verma', age: 22, pcosRisk: 'high' },
  { id: '5', name: 'Priya Nair', age: 26, pcosRisk: 'medium' },
];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM',
];

const STATUS_STYLE: Record<string, string> = {
  upcoming: 'bg-primary/10 text-primary',
  completed: 'bg-green-100 text-green-600',
  cancelled: 'bg-destructive/10 text-destructive',
};

const DoctorAppointmentsPage = () => {
  const storageKey = 'doctor_appointments';
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const [appointments, setAppointments] = useState<any[]>(stored.length > 0 ? stored : [
    { id: '101', patientId: '1', patientName: 'Ananya Sharma', date: '2026-05-07', time: '10:00 AM', reason: 'PCOS follow-up', status: 'upcoming' },
    { id: '102', patientId: '4', patientName: 'Sneha Verma', date: '2026-05-07', time: '11:00 AM', reason: 'First consultation', status: 'upcoming' },
    { id: '103', patientId: '2', patientName: 'Ritu Gupta', date: '2026-05-06', time: '03:00 PM', reason: 'Cycle irregularity', status: 'completed' },
    { id: '104', patientId: '5', patientName: 'Priya Nair', date: '2026-05-05', time: '09:30 AM', reason: 'Routine checkup', status: 'completed' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientId: '', date: '', time: '', reason: '' });
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const saveAppt = () => {
    if (!form.patientId || !form.date || !form.time) return;
    const patient = MOCK_PATIENTS.find(p => p.id === form.patientId);
    const newAppt = {
      id: Date.now().toString(),
      patientId: form.patientId,
      patientName: patient?.name || '',
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: 'upcoming',
    };
    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setForm({ patientId: '', date: '', time: '', reason: '' });
    setShowForm(false);
  };

  const updateStatus = (id: string, status: string) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const filtered = appointments.filter(a => a.status === activeTab);

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="space-y-4">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-foreground">Appointments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{appointments.filter(a => a.status === 'upcoming').length} upcoming</p>
        </div>
        <button
          onClick={() => setShowForm(s => !s)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md"
          style={{ background: 'var(--rose-gradient)' }}
        >
          <Plus size={18} />
        </button>
      </motion.div>

      {/* Add Appointment Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <GlassCard className="border-l-4 border-primary">
              <h3 className="font-display text-base text-foreground mb-3 flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> New Appointment
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Select Patient</label>
                  <select value={form.patientId} onChange={e => setForm(p => ({ ...p, patientId: e.target.value }))} className={inputClass}>
                    <option value="">-- Choose patient --</option>
                    {MOCK_PATIENTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Age {p.age})</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Date</label>
                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Time</label>
                    <select value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className={inputClass}>
                      <option value="">-- Time --</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Reason</label>
                  <input placeholder="e.g. PCOS follow-up, routine checkup..." value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} className={inputClass} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" style={{ background: 'var(--rose-gradient)' }} onClick={saveAppt}>
                    <Check size={14} className="mr-1" /> Book
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                    <X size={14} className="mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${activeTab === tab ? 'bg-primary text-white' : 'glass-card text-muted-foreground'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className="space-y-3">
        {filtered.map((appt, i) => (
          <motion.div key={appt.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <GlassCard className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: 'var(--rose-gradient)' }}>
                  {appt.patientName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{appt.patientName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar size={11} /> {appt.date}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock size={11} /> {appt.time}
                    </span>
                  </div>
                  {appt.reason && <p className="text-[11px] text-muted-foreground mt-0.5">📋 {appt.reason}</p>}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLE[appt.status]}`}>
                  {appt.status}
                </span>
              </div>

              {appt.status === 'upcoming' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateStatus(appt.id, 'completed')}
                    className="flex-1 py-1.5 rounded-xl text-xs font-semibold bg-green-100 text-green-600 hover:bg-green-200 transition-all">
                    ✓ Mark Done
                  </button>
                  <button onClick={() => updateStatus(appt.id, 'cancelled')}
                    className="flex-1 py-1.5 rounded-xl text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all">
                    ✕ Cancel
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No {activeTab} appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
