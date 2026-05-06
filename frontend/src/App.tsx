import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getProfile } from "@/lib/store";
import AppLayout from "@/components/layout/AppLayout";

import LandingPage from "./pages/LandingPage";

import OnboardingPage from "./pages/patient/OnboardingPage";
import DashboardPage from "./pages/patient/DashboardPage";
import CycleTrackerPage from "./pages/patient/CycleTrackerPage";
import PCOSDetectionPage from "./pages/patient/PCOSDetectionPage";
import DietPlanPage from "./pages/patient/DietPlanPage";
import ExercisePage from "./pages/patient/ExercisePage";
// import FitnessPage from "./pages/FitnessPage";
import YogaPage from "./pages/patient/YogaPage";
import DailyCarePage from "./pages/patient/DailyCarePage";
import NotFound from "./pages/patient/NotFound";
import HealthDashboardPage from "./pages/patient/HealthDashboardPage"

// Doctor Portal
import DoctorLoginPage from "./pages/doctor/DoctorLoginPage";
import DoctorLayout from "./pages/doctor/DoctorLayout";
import DoctorDashboardPage from "./pages/doctor/DoctorDashboardPage";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import DoctorPatientProfilePage from "./pages/doctor/DoctorPatientProfilePage";
import DoctorNotesPage from "./pages/doctor/DoctorNotesPage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import DoctorConsultationPage from "./pages/doctor/DoctorConsultationPage";


const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const profile = getProfile();
  if (!profile) return <Navigate to="/" replace />;
  return <>{children}</>;
};


const DoctorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem('doctor_auth');
  if (!auth) return <Navigate to="/doctor/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Patient Routes */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cycle" element={<CycleTrackerPage />} />
            <Route path="/pcos" element={<PCOSDetectionPage />} />
            <Route path="/diet" element={<DietPlanPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
              {/* <Route path="/fitness" element={<FitnessPage />} /> */}
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/daily-care" element={<DailyCarePage />} />
            <Route path="/health-dashboard" element={<HealthDashboardPage/>}/>
          </Route>

          
          {/* Doctor Routes */}
          <Route path="/doctor/login" element={<DoctorLoginPage />} />
          <Route element={<DoctorProtectedRoute><DoctorLayout /></DoctorProtectedRoute>}>
            <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
            <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
            <Route path="/doctor/patients/:id" element={<DoctorPatientProfilePage />} />
            <Route path="/doctor/notes" element={<DoctorNotesPage />} />
            <Route path="/doctor/profile" element={<DoctorProfilePage />} />
            <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
            <Route path="/doctor/consultations" element={<DoctorConsultationPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;