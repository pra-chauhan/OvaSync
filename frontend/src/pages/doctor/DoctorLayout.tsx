import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import BackgroundOrbs from '@/components/layout/BackgroundOrbs';
import { LayoutDashboard, Users, FileText, LogOut, Stethoscope, Calendar, MessageCircle } from 'lucide-react';

const navItems = [
  { to: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/doctor/patients', icon: Users, label: 'Patients' },
  { to: '/doctor/appointments', icon: Calendar, label: 'Appts' },
  { to: '/doctor/consultations', icon: MessageCircle, label: 'Consults' },
  { to: '/doctor/notes', icon: FileText, label: 'Notes' },
];

const DoctorLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('doctor_auth');
    navigate('/doctor/login');
  };

  const doctor = JSON.parse(localStorage.getItem('doctor_auth') || '{}');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundOrbs />

      {/* Top Header */}
      <header className="relative z-20 glass-card border-b border-border/50 px-4 py-3 flex items-center justify-between mx-4 mt-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--rose-gradient)' }}>
            <Stethoscope size={16} className="text-white" />
          </div>
          <span className="font-display text-lg text-foreground">NariCare<span className="text-primary">AI</span></span>
          <span className="text-xs text-muted-foreground ml-1">· Doctor</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Doctor name chip — click to open profile */}
          <button
            onClick={() => navigate('/doctor/profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card hover:bg-white/60 transition-all"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'var(--rose-gradient)' }}>
              {(doctor.name || 'Dr')[3] || 'D'}
            </div>
            <span className="text-sm text-foreground font-medium max-w-[120px] truncate">{doctor.name || 'Doctor'}</span>
          </button>

          <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors p-1">
            <LogOut size={17} />
          </button>
        </div>
      </header>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 px-1 py-1">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-200 text-[10px] font-body ${
                  isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="relative z-10 pb-24 px-4 pt-5 max-w-lg mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
