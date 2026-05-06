import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Stethoscope, Phone, Mail, MapPin,
  GraduationCap, Award, Pencil, Check, X
} from 'lucide-react';

const DoctorProfilePage = () => {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('doctor_profile_full') || '{}');

  const [profile, setProfile] = useState({
    name: stored.name || 'Dr. Priya Sharma',
    specialization: stored.specialization || 'Gynecologist & PCOS Specialist',
    qualification: stored.qualification || 'MBBS, MD (Obstetrics & Gynaecology)',
    experience: stored.experience || '8 Years Experience',
    hospital: stored.hospital || 'Apollo Hospitals, Delhi',
    phone: stored.phone || '+91 98765 43210',
    email: stored.email || 'doctor@naricare.ai',
    location: stored.location || 'New Delhi, India',
    about: stored.about || 'Specialized in PCOS management, hormonal disorders, and women\'s reproductive health. Passionate about using AI-powered tools to improve patient outcomes.',
  });

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  const saveProfile = () => {
    setProfile(editForm);
    localStorage.setItem('doctor_profile_full', JSON.stringify(editForm));
    // also update doctor_auth name
    const auth = JSON.parse(localStorage.getItem('doctor_auth') || '{}');
    localStorage.setItem('doctor_auth', JSON.stringify({ ...auth, name: editForm.name }));
    setEditing(false);
  };

  const inputClass = "w-full px-3 py-2 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40";

  const infoRows = [
    { icon: Stethoscope, label: 'Specialization', key: 'specialization' },
    { icon: GraduationCap, label: 'Qualification', key: 'qualification' },
    { icon: Award, label: 'Experience', key: 'experience' },
    { icon: MapPin, label: 'Hospital', key: 'hospital' },
    { icon: Phone, label: 'Phone', key: 'phone' },
    { icon: Mail, label: 'Email', key: 'email' },
    { icon: MapPin, label: 'Location', key: 'location' },
  ];

  return (
    <div className="space-y-4">

      {/* Back */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </motion.div>

      {/* Profile Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <GlassCard tilt className="text-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
            style={{ background: 'var(--rose-gradient)' }}>
            {profile.name.charAt(3)}
          </div>
          <h1 className="text-xl font-display text-foreground">{profile.name}</h1>
          <p className="text-sm text-primary mt-0.5">{profile.specialization}</p>
          <p className="text-xs text-muted-foreground mt-1">{profile.hospital}</p>

          <div className="flex justify-center gap-3 mt-4">
            <span className="text-xs px-3 py-1 rounded-full glass-card text-foreground">{profile.experience}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Active</span>
          </div>
        </GlassCard>
      </motion.div>

      {/* About */}
      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-base text-foreground">About</h3>
          {!editing && (
            <button onClick={() => { setEditForm({ ...profile }); setEditing(true); }}
              className="text-primary text-xs flex items-center gap-1">
              <Pencil size={12} /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <textarea
            rows={3}
            value={editForm.about}
            onChange={e => setEditForm(p => ({ ...p, about: e.target.value }))}
            className={`${inputClass} resize-none`}
          />
        ) : (
          <p className="text-sm text-foreground leading-relaxed">{profile.about}</p>
        )}
      </GlassCard>

      {/* Info */}
      <GlassCard>
        <h3 className="font-display text-base text-foreground mb-3">Professional Info</h3>
        <div className="space-y-3">
          {infoRows.map(({ icon: Icon, label, key }) => (
            <div key={key} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                {editing ? (
                  <input
                    value={editForm[key as keyof typeof editForm]}
                    onChange={e => setEditForm(p => ({ ...p, [key]: e.target.value }))}
                    className={inputClass + ' mt-0.5'}
                  />
                ) : (
                  <p className="text-sm text-foreground">{profile[key as keyof typeof profile]}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="flex gap-2 mt-4">
            <Button className="flex-1" style={{ background: 'var(--rose-gradient)' }} onClick={saveProfile}>
              <Check size={14} className="mr-1" /> Save
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>
              <X size={14} className="mr-1" /> Cancel
            </Button>
          </div>
        )}
      </GlassCard>

    </div>
  );
};

export default DoctorProfilePage;
