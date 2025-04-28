import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Components
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const DoctorDashboard = lazy(() => import('./pages/doctor/Dashboard'));
const PatientDashboard = lazy(() => import('./pages/patient/Dashboard'));
const AIDiseasePrediction = lazy(() => import('./pages/AIDiseasePrediction'));
const PatientsList = lazy(() => import('./pages/doctor/PatientsList'));
const PatientDetail = lazy(() => import('./pages/doctor/PatientDetail'));
const Settings = lazy(() => import('./pages/Settings'));
const Meetings = lazy(() => import('./pages/Meetings'));

// AI Prediction Pages
const AsthmaDetection = lazy(() => import('./pages/ai-prediction/AsthmaDetection'));
const CancerDetection = lazy(() => import('./pages/ai-prediction/CancerDetection'));
const DiabetesDetection = lazy(() => import('./pages/ai-prediction/DiabetesDetection'));
const HeartDiseaseDetection = lazy(() => import('./pages/ai-prediction/HeartDiseaseDetection'));
const KidneyDiseaseDetection = lazy(() => import('./pages/ai-prediction/KidneyDiseaseDetection'));

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="doctor">
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="patients" element={<PatientsList />} />
              <Route path="patients/:id" element={<PatientDetail />} />
            </Route>
            <Route path="patient">
              <Route path="dashboard" element={<PatientDashboard />} />
            </Route>
            <Route path="ai-prediction">
              <Route index element={<AIDiseasePrediction />} />
              <Route path="asthma" element={<AsthmaDetection />} />
              <Route path="cancer" element={<CancerDetection />} />
              <Route path="diabetes" element={<DiabetesDetection />} />
              <Route path="heart" element={<HeartDiseaseDetection />} />
              <Route path="kidney" element={<KidneyDiseaseDetection />} />
            </Route>
            <Route path="meetings" element={<Meetings />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;