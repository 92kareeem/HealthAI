import { useState } from 'react';
import { 
  Users, 
  Activity, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Brain,
  ChevronRight,
  Droplet,
  Pill,
  ChevronDown,
  ChevronUp,
  Eye,
  Search,
  UserPlus,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [patientsFilter, setPatientsFilter] = useState('recent');
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  
  // Mock data
  const patientData = [
    { name: 'Jan', count: 65 },
    { name: 'Feb', count: 59 },
    { name: 'Mar', count: 80 },
    { name: 'Apr', count: 81 },
    { name: 'May', count: 56 },
    { name: 'Jun', count: 55 },
    { name: 'Jul', count: 40 },
    { name: 'Aug', count: 70 },
    { name: 'Sep', count: 90 },
    { name: 'Oct', count: 85 },
    { name: 'Nov', count: 77 },
    { name: 'Dec', count: 62 },
  ];

  const diagnosisData = [
    { name: 'Heart Disease', value: 35 },
    { name: 'Diabetes', value: 25 },
    { name: 'Asthma', value: 15 },
    { name: 'Kidney Stone', value: 10 },
    { name: 'Others', value: 15 },
  ];

  const COLORS = ['#0062B8', '#00B8A6', '#9D4EDD', '#F5A623', '#1D7832'];

  const patients = [
    {
      id: 1,
      name: 'Emma Thompson',
      age: 42,
      gender: 'Female',
      condition: 'Hypertension',
      lastVisit: '2 days ago',
      status: 'Stable',
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
      priority: 'medium',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      age: 65,
      gender: 'Male',
      condition: 'Diabetes Type 2',
      lastVisit: '1 week ago',
      status: 'Needs attention',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      priority: 'high',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      condition: 'Asthma',
      lastVisit: '3 days ago',
      status: 'Stable',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      priority: 'low',
    },
    {
      id: 4,
      name: 'David Chen',
      age: 58,
      gender: 'Male',
      condition: 'Arthritis',
      lastVisit: '2 weeks ago',
      status: 'Improving',
      image: 'https://randomuser.me/api/portraits/men/70.jpg',
      priority: 'medium',
    },
  ];

  const appointments = [
    {
      id: 1,
      patient: {
        name: 'Emma Thompson',
        image: 'https://randomuser.me/api/portraits/women/24.jpg',
      },
      date: 'Today',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'Confirmed',
      notes: 'Blood pressure check and medication review',
    },
    {
      id: 2,
      patient: {
        name: 'Michael Rodriguez',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      date: 'Today',
      time: '2:30 PM',
      type: 'Urgent',
      status: 'Confirmed',
      notes: 'Diabetes check-up and blood sugar level review',
    },
    {
      id: 3,
      patient: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/67.jpg',
      },
      date: 'Tomorrow',
      time: '11:15 AM',
      type: 'Regular',
      status: 'Pending',
      notes: 'Asthma follow-up and inhaler prescription renewal',
    },
  ];

  const alertsData = [
    {
      id: 1,
      patient: 'Michael Rodriguez',
      message: 'Blood sugar levels critically high',
      time: '2 hours ago',
      severity: 'high',
    },
    {
      id: 2,
      patient: 'Emma Thompson',
      message: 'Missed medication for 2 days',
      time: '5 hours ago',
      severity: 'medium',
    },
    {
      id: 3,
      patient: 'David Chen',
      message: 'Lab results ready for review',
      time: '1 day ago',
      severity: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-500';
      case 'medium':
        return 'bg-warning-500';
      case 'low':
        return 'bg-success-500';
      default:
        return 'bg-neutral-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-error-500 bg-error-50 dark:bg-error-900/10';
      case 'medium':
        return 'border-l-4 border-warning-500 bg-warning-50 dark:bg-warning-900/10';
      case 'low':
        return 'border-l-4 border-success-500 bg-success-50 dark:bg-success-900/10';
      default:
        return 'border-l-4 border-neutral-500';
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Overview card */}
        <motion.div 
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 text-primary-500 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Total Patients
              </h2>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">248</p>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData.slice(-6)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="patientGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0062B8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0062B8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#0062B8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#patientGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right">
            <span className="text-sm text-success-500">+4.5% </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">from last month</span>
          </div>
        </motion.div>

        {/* Appointments card */}
        <motion.div 
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/20 text-secondary-500 rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Appointments
              </h2>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">12 Today</p>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData.slice(-6)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B8A6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#00B8A6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#appointmentGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right">
            <span className="text-sm text-error-500">-2.3% </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">from last week</span>
          </div>
        </motion.div>

        {/* AI Predictions card */}
        <motion.div 
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-accent-100 dark:bg-accent-900/20 text-accent-500 rounded-lg">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                AI Diagnoses
              </h2>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">85 This Month</p>
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diagnosisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {diagnosisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right">
            <span className="text-sm text-success-500">+12.7% </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">diagnostic accuracy</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment list */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Today's Appointments
                </h2>
                <button className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={appointment.patient.image}
                        alt={appointment.patient.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {appointment.patient.name}
                        </h3>
                        <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.time}</span>
                          <span className="mx-2">•</span>
                          <span 
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              appointment.type === 'Urgent' ? 'bg-error-100 dark:bg-error-900/20 text-error-600 dark:text-error-400' : 
                              appointment.type === 'Follow-up' ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 
                              'bg-secondary-100 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400'
                            }`}
                          >
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-neutral-500 dark:text-neutral-400"
                      onClick={() => setExpandedAppointment(expandedAppointment === appointment.id ? null : appointment.id)}
                    >
                      {expandedAppointment === appointment.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {expandedAppointment === appointment.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      >
                        <p className="text-sm mb-3">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm">
                            Start Session
                          </button>
                          <button className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-md text-sm">
                            Reschedule
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Patient stats */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Patient Statistics
              </h2>
              <select 
                className="bg-neutral-100 dark:bg-neutral-700 border-0 rounded-md text-neutral-800 dark:text-neutral-200 text-sm"
                defaultValue="thisYear"
              >
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="thisYear">This Year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="Patients" 
                    stroke="#0062B8" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Alerts */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning-500" />
                  Alerts
                </h2>
                <span className="px-2 py-1 bg-warning-100 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400 text-xs font-medium rounded-full">
                  {alertsData.length} New
                </span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {alertsData.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-neutral-900 dark:text-white">
                      {alert.patient}
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Patients */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Recent Patients
                </h2>
                <div className="flex">
                  <button 
                    className={`px-3 py-1 text-sm rounded-l-md ${patientsFilter === 'recent' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'}`}
                    onClick={() => setPatientsFilter('recent')}
                  >
                    Recent
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-r-md ${patientsFilter === 'critical' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'}`}
                    onClick={() => setPatientsFilter('critical')}
                  >
                    Critical
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-full bg-neutral-100 dark:bg-neutral-700 border-0 rounded-md pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </div>
              <div className="space-y-1">
                {patients
                  .filter(patient => patientsFilter === 'critical' ? patient.priority === 'high' : true)
                  .map((patient) => (
                    <div 
                      key={patient.id}
                      className="flex items-center justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md cursor-pointer"
                      onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={patient.image}
                            alt={patient.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${getPriorityColor(patient.priority)} ring-2 ring-white dark:ring-neutral-800`}></span>
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900 dark:text-white">
                            {patient.name}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {patient.age}, {patient.gender} • {patient.condition}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-neutral-400" />
                    </div>
                  ))
                }
              </div>
              <div className="p-2 flex justify-center mt-2">
                <button 
                  className="flex items-center justify-center w-full py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  onClick={() => setShowAddPatient(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Patient
                </button>
              </div>
            </div>
          </motion.div>

          {/* Health Tips */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Medical Insight</h2>
              <p className="text-white/90 text-sm">
                Recent studies show combining AI predictions with doctor expertise improves diagnostic accuracy by 35%.
              </p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md">
                <Heart className="h-5 w-5 text-error-500" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Heart disease risk factors updated in new guidelines
                </p>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md">
                <Droplet className="h-5 w-5 text-primary-500" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  New diabetes treatment shows promising results
                </p>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md">
                <Pill className="h-5 w-5 text-secondary-500" />
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  FDA approves new medication for chronic asthma
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddPatient(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Add New Patient</h2>
                <button
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  onClick={() => setShowAddPatient(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      First Name
                    </label>
                    <input type="text" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Last Name
                    </label>
                    <input type="text" className="w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <input type="email" className="w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Age
                    </label>
                    <input type="number" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Gender
                    </label>
                    <select className="w-full">
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Condition / Diagnosis
                  </label>
                  <input type="text" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Notes
                  </label>
                  <textarea rows={3} className="w-full"></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    onClick={() => setShowAddPatient(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
                    Add Patient
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;