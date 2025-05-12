import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import getIcon1 from './utils/iconUtils';
import { setUser, clearUser } from './store/userSlice';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' 
                      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Icon declarations
  const MoonIcon = getIcon1('Moon');
  const SunIcon = getIcon1('Sun');

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const initializeApperUI = async () => {
      try {
        const { ApperClient, ApperUI } = window.ApperSDK;
        const client = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
        
        // Initialize but don't show login yet
        ApperUI.setup(client, {
          target: '#authentication',
          clientId: import.meta.env.VITE_APPER_PROJECT_ID,
          view: 'both',
          onSuccess: function(user) {
            // Store user data in Redux store
            if (user && user.isAuthenticated) {
              dispatch(setUser(user));
              navigate('/dashboard');
            }
          },
          onError: function(error) {
            console.error("Authentication failed:", error);
          }
        });
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing ApperUI:", error);
      }
    };

    initializeApperUI();
  }, [dispatch, navigate]);

  useEffect(() => {
    // Update the HTML class when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={authMethods}>
      <>
        {/* Theme toggle button */}
        <motion.button
          className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-surface-200 dark:bg-surface-800 shadow-lg"
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-indigo-600" />}
        </motion.button>

        {/* Main content */}
        <Routes>
          {/* Public home route */}
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />} />
          
          {/* Public routes - accessible only when NOT authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          
          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toast notification container */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          toastClassName="text-sm font-medium rounded-lg"
        />
      </>
    </AuthContext.Provider>
  );
}

export default App;