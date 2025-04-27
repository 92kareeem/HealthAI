import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, CloudLightning, Users, Activity, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'doctor' | 'patient' | null>(null);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary-500" />,
      title: 'AI Disease Detection',
      description: 'Advanced machine learning algorithms for accurate disease prediction and diagnosis assistance.',
      color: 'from-primary-500/20 to-primary-400/10',
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary-500" />,
      title: 'Blockchain Security',
      description: 'Secure patient data with blockchain technology for ultimate privacy and data integrity.',
      color: 'from-secondary-500/20 to-secondary-400/10',
    },
    {
      icon: <CloudLightning className="h-8 w-8 text-accent-500" />,
      title: 'IPFS Cloud Storage',
      description: 'Decentralized storage for medical records, ensuring data availability and security.',
      color: 'from-accent-500/20 to-accent-400/10',
    },
    {
      icon: <Activity className="h-8 w-8 text-success-500" />,
      title: 'Deep Analytics',
      description: 'Comprehensive data visualization and insights for better patient care decisions.',
      color: 'from-success-500/20 to-success-400/10',
    },
    {
      icon: <Users className="h-8 w-8 text-warning-500" />,
      title: 'Secure Sharing',
      description: 'Share patient information with colleagues securely, maintain complete control.',
      color: 'from-warning-500/20 to-warning-400/10',
    },
    {
      icon: <QrCode className="h-8 w-8 text-error-500" />,
      title: 'QR Integration',
      description: 'Quick access to patient information with secure, generated QR codes.',
      color: 'from-error-500/20 to-error-400/10',
    },
  ];

  const continueAsDoctorOrPatient = (selectedRole: 'doctor' | 'patient') => {
    setRole(selectedRole);
    setTimeout(() => {
      navigate(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }, 500);
  };

  return (
    <div className="container mx-auto">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Welcome to <span className="text-primary-500">HealthAI</span> Platform
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Advanced AI-powered healthcare platform for doctors and patients, combining cutting-edge technology with medical expertise.
        </p>
      </motion.div>

      <div className="mb-12 bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
          Continue as Doctor or Patient
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className={`glass-card p-8 rounded-xl cursor-pointer text-center transition-all ${
              role === 'doctor' ? 'ring-2 ring-primary-500' : ''
            }`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => continueAsDoctorOrPatient('doctor')}
          >
            <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Doctor</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Access your patient records, use AI diagnosis tools, and manage appointments.
            </p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition-colors">
              Continue as Doctor
            </button>
          </motion.div>

          <motion.div 
            className={`glass-card p-8 rounded-xl cursor-pointer text-center transition-all ${
              role === 'patient' ? 'ring-2 ring-secondary-500' : ''
            }`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => continueAsDoctorOrPatient('patient')}
          >
            <div className="bg-secondary-100 dark:bg-secondary-900/20 text-secondary-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Patient</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              View your medical records, schedule appointments, and communicate with your doctors.
            </p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-full transition-colors">
              Continue as Patient
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
          Ready to transform healthcare?
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
          Join thousands of healthcare professionals using HealthAI to improve patient outcomes and streamline their practice.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full transition-colors">
            Get Started
          </button>
          <button className="border border-neutral-300 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 text-neutral-900 dark:text-white px-8 py-3 rounded-full transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;