import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, ChevronRight, Activity, Calendar, Clock, AlertTriangle } from 'lucide-react';

const PatientsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'stable' | 'improving'>('all');

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Emma Thompson',
      age: 42,
      gender: 'Female',
      condition: 'Hypertension',
      status: 'stable',
      lastVisit: '2 days ago',
      nextAppointment: 'Tomorrow, 10:00 AM',
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        temperature: '98.6°F'
      }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      age: 65,
      gender: 'Male',
      condition: 'Diabetes Type 2',
      status: 'critical',
      lastVisit: '1 week ago',
      nextAppointment: 'Today, 2:30 PM',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      vitals: {
        bloodPressure: '140/90',
        heartRate: '88 bpm',
        temperature: '99.1°F'
      }
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      condition: 'Asthma',
      status: 'improving',
      lastVisit: '3 days ago',
      nextAppointment: 'Next week',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      vitals: {
        bloodPressure: '118/75',
        heartRate: '68 bpm',
        temperature: '98.4°F'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-error-500';
      case 'stable':
        return 'bg-success-500';
      case 'improving':
        return 'bg-warning-500';
      default:
        return 'bg-neutral-500';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Patients List</h1>
        <button
          onClick={() => {/* Handle new patient */}}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-neutral-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
              >
                <option value="all">All Patients</option>
                <option value="critical">Critical</option>
                <option value="stable">Stable</option>
                <option value="improving">Improving</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {filteredPatients.map((patient) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 cursor-pointer"
              onClick={() => navigate(`/doctor/patients/${patient.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={patient.image}
                      alt={patient.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span 
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(patient.status)} border-2 border-white dark:border-neutral-800`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">{patient.name}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {patient.age} years • {patient.gender} • {patient.condition}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="hidden md:block">
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Activity className="w-4 h-4 mr-1" />
                      <span>{patient.vitals.bloodPressure}</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Next: {patient.nextAppointment}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              </div>
              
              {patient.status === 'critical' && (
                <div className="mt-3 flex items-center text-error-500 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span>Requires immediate attention</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsList;