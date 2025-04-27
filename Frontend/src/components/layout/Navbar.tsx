import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  Menu, 
  MoonStar, 
  Sun,
  Search,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../common/Avatar';

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New patient request',
      message: 'John Doe has requested an appointment',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Lab results ready',
      message: 'Blood test results for patient #2458 are ready',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'System update',
      message: 'New AI detection models have been added',
      time: '2 days ago',
      read: true
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/doctor/dashboard') return 'Doctor Dashboard';
    if (path === '/patient/dashboard') return 'Patient Dashboard';
    if (path.includes('/doctor/patients') && !path.includes('/:id')) return 'Patients List';
    if (path.includes('/doctor/patients/')) return 'Patient Details';
    if (path === '/ai-prediction') return 'AI Disease Prediction';
    if (path === '/meetings') return 'Meetings';
    if (path === '/profile') return 'Profile';
    if (path === '/settings') return 'Settings';
    return '';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set dark mode on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
    setSearchQuery('');
    setShowSearch(false);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm z-20 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-lg font-semibold text-neutral-900 dark:text-white">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {!showSearch ? (
              <button 
                className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            ) : (
              <AnimatePresence>
                <motion.form 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                  onSubmit={handleSearch}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md"
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.form>
              </AnimatePresence>
            )}

            <button
              className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-error-500 text-white text-xs flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg py-2 z-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-xs text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                            !notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${!notification.read ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700 text-center">
                      <Link to="/notifications" className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/profile" className="flex items-center">
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Dr. Alex Johnson"
                status="online"
                size="sm"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;