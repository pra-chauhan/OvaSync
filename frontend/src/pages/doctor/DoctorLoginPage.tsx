import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BackgroundOrbs from '@/components/layout/BackgroundOrbs';
import { Stethoscope, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!form.email || !form.password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      if (form.email === 'doctor@naricare.ai' && form.password === 'doctor123') {
        localStorage.setItem('doctor_auth', JSON.stringify({ name: 'Dr. Priya Sharma', email: form.email }));
        navigate('/doctor/dashboard');
      } else {
        setError('Invalid credentials. Try doctor@naricare.ai / doctor123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <BackgroundOrbs />
      <div className="relative z-10 w-full max-w-md px-6">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: 'var(--rose-gradient)' }}>
            <Stethoscope className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-display text-foreground">NariCare<span className="text-primary">AI</span></h1>
          <p className="text-sm font-body text-muted-foreground mt-1">Doctor Portal</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-7 space-y-5"
        >
          <h2 className="text-xl font-display text-foreground text-center">Welcome Back, Doctor</h2>

          {/* Email */}
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="doctor@naricare.ai"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-body text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full pl-9 pr-10 py-3 rounded-xl border border-border bg-white/60 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
            style={{ background: 'var(--rose-gradient)' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Patient portal?{' '}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() => navigate('/')}
            >
              Go to Patient App
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
