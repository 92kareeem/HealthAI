import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PatientDetail = () => {
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Loading patient data for ID: {id}...</p>
      </div>
    </motion.div>
  );
};

export default PatientDetail;