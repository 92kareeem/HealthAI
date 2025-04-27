import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users, Plus, Search, Filter, ChevronDown } from 'lucide-react';

export default function Meetings() {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingMeetings = [
    {
      id: 1,
      patientName: "Emma Thompson",
      date: "2025-03-15",
      time: "10:00 AM",
      type: "Follow-up",
      status: "confirmed",
      participants: 2,
      image: "https://randomuser.me/api/portraits/women/24.jpg"
    },
    {
      id: 2,
      patientName: "Michael Rodriguez",
      date: "2025-03-15",
      time: "2:30 PM",
      type: "Initial Consultation",
      status: "pending",
      participants: 3,
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: 3,
      patientName: "Sarah Johnson",
      date: "2025-03-16",
      time: "11:15 AM",
      type: "Emergency",
      status: "confirmed",
      participants: 2,
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      patientName: "David Chen",
      date: "2025-03-10",
      time: "3:00 PM",
      type: "Follow-up",
      status: "completed",
      participants: 2,
      image: "https://randomuser.me/api/portraits/men/70.jpg"
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      date: "2025-03-09",
      time: "1:45 PM",
      type: "Initial Consultation",
      status: "completed",
      participants: 3,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`rounded-lg px-4 py-2 ${
              selectedTab === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`rounded-lg px-4 py-2 ${
              selectedTab === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Past
          </button>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meetings..."
              className="rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {(selectedTab === 'upcoming' ? upcomingMeetings : pastMeetings).map((meeting) => (
          <div
            key={meeting.id}
            className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={meeting.image}
                alt={meeting.patientName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{meeting.patientName}</h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{meeting.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 sm:mt-0">
              <span className={`rounded-full px-3 py-1 text-sm ${getStatusColor(meeting.status)}`}>
                {meeting.status}
              </span>
              {selectedTab === 'upcoming' && (
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  <Video className="h-5 w-5" />
                  <span>Join</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}