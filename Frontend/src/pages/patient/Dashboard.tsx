import React from 'react';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <p className="text-gray-600">No upcoming appointments</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Prescriptions</h2>
          <p className="text-gray-600">No recent prescriptions</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Metrics</h2>
          <p className="text-gray-600">No health data available</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientDashboard;