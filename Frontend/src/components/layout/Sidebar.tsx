import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Brain, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Activity,
  ShieldCheck,
  Wallet,
  HelpCircle,
  FileText,
  CloudLightning
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const doctorMenuItems = [
    {
      title: 'Dashboard',
      path: '/doctor/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: 'Patients',
      path: '/doctor/patients',
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: 'AI Diagnosis',
      path: '/ai-prediction',
      icon: <Brain className="w-5 h-5" />,
      submenu: [
        { title: 'Heart Disease', path: '/ai-prediction/heart' },
        { title: 'Diabetes', path: '/ai-prediction/diabetes' },
        { title: 'Cancer Detection', path: '/ai-prediction/cancer' },
        { title: 'Asthma', path: '/ai-prediction/asthma' },
        { title: 'Kidney Stone', path: '/ai-prediction/kidney' }
      ]
    },
    {
      title: 'Meetings',
      path: '/meetings',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: 'Analytics',
      path: '/analytics',
      icon: <Activity className="w-5 h-5" />,
    },
    {
      title: 'Medical Records',
      path: '/records',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const generalMenuItems = [
    {
      title: 'Blockchain',
      path: '/blockchain',
      icon: <ShieldCheck className="w-5 h-5" />,
      submenu: [
        { title: 'Data Sharing', path: '/blockchain/sharing' },
        { title: 'Security', path: '/blockchain/security' },
        { title: 'Wallet Integration', path: '/blockchain/wallet' }
      ]
    },
    {
      title: 'Wallet',
      path: '/wallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      title: 'IPFS Storage',
      path: '/ipfs',
      icon: <CloudLightning className="w-5 h-5" />,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
    {
      title: 'Help & Support',
      path: '/help',
      icon: <HelpCircle className="w-5 h-5" />,
    }
  ];

  const toggleSubmenu = (title: string) => {
    if (activeMenu === title) {
      setActiveMenu(null);
    } else {
      setActiveMenu(title);
    }
  };

  const sidebarVariants = {
    open: {
      width: '280px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      width: '0px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: 0.1
      }
    }
  };

  const navItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      display: 'flex',
      transition: {
        delay: 0.1
      }
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1
      },
      transitionEnd: {
        display: 'none'
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black lg:hidden z-10"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className={`fixed inset-y-0 left-0 bg-white dark:bg-neutral-900 z-20 shadow-md overflow-hidden lg:relative lg:block ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="h-screen flex flex-col justify-between">
          <div className="overflow-y-auto h-full">
            <div className="flex items-center justify-between px-5 h-16">
              <motion.div
                variants={navItemVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                className="flex items-center"
              >
                <Logo />
                <span className="ml-2 text-lg font-bold text-primary-600 dark:text-primary-400">
                  HealthAI
                </span>
              </motion.div>
              <button
                className="lg:hidden text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                onClick={toggleSidebar}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="px-4 mt-6">
              <motion.div
                variants={navItemVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
              >
                <span className="px-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Doctor Portal
                </span>
              </motion.div>

              <ul className="mt-2 space-y-1">
                {doctorMenuItems.map((item) => (
                  <li key={item.path}>
                    {item.submenu ? (
                      <div>
                        <button
                          className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors ${
                            location.pathname.startsWith(item.path)
                              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">
                              {item.icon}
                            </span>
                            <motion.span
                              variants={navItemVariants}
                              initial="closed"
                              animate={isOpen ? 'open' : 'closed'}
                            >
                              {item.title}
                            </motion.span>
                          </div>
                          <motion.svg
                            variants={navItemVariants}
                            initial="closed"
                            animate={isOpen ? 'open' : 'closed'}
                            className={`w-4 h-4 transition-transform ${
                              activeMenu === item.title ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {activeMenu === item.title && isOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-1 pl-8 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <li key={subItem.path}>
                                  <NavLink
                                    to={subItem.path}
                                    className={({ isActive }) =>
                                      `block px-2 py-1.5 text-sm rounded-md ${
                                        isActive
                                          ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400'
                                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                      }`
                                    }
                                  >
                                    {subItem.title}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`
                        }
                      >
                        <span className="mr-3">
                          {item.icon}
                        </span>
                        <motion.span
                          variants={navItemVariants}
                          initial="closed"
                          animate={isOpen ? 'open' : 'closed'}
                        >
                          {item.title}
                        </motion.span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-4 mt-6">
              <motion.div
                variants={navItemVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
              >
                <span className="px-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  System
                </span>
              </motion.div>

              <ul className="mt-2 space-y-1">
                {generalMenuItems.map((item) => (
                  <li key={item.path}>
                    {item.submenu ? (
                      <div>
                        <button
                          className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors ${
                            location.pathname.startsWith(item.path)
                              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">
                              {item.icon}
                            </span>
                            <motion.span
                              variants={navItemVariants}
                              initial="closed"
                              animate={isOpen ? 'open' : 'closed'}
                            >
                              {item.title}
                            </motion.span>
                          </div>
                          <motion.svg
                            variants={navItemVariants}
                            initial="closed"
                            animate={isOpen ? 'open' : 'closed'}
                            className={`w-4 h-4 transition-transform ${
                              activeMenu === item.title ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {activeMenu === item.title && isOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-1 pl-8 space-y-1"
                            >
                              {item.submenu.map((subItem) => (
                                <li key={subItem.path}>
                                  <NavLink
                                    to={subItem.path}
                                    className={({ isActive }) =>
                                      `block px-2 py-1.5 text-sm rounded-md ${
                                        isActive
                                          ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400'
                                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                      }`
                                    }
                                  >
                                    {subItem.title}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`
                        }
                      >
                        <span className="mr-3">
                          {item.icon}
                        </span>
                        <motion.span
                          variants={navItemVariants}
                          initial="closed"
                          animate={isOpen ? 'open' : 'closed'}
                        >
                          {item.title}
                        </motion.span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <button className="flex w-full items-center px-2 py-2 text-sm rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <LogOut className="w-5 h-5 mr-3" />
              <motion.span
                variants={navItemVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
              >
                Log out
              </motion.span>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Sidebar;