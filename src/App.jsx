import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import getIcon1 from './utils/iconUtils';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' 
                      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Icon declarations
  const MoonIcon = getIcon1('Moon');
  const SunIcon = getIcon1('Sun');

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

  return (
    <div className="min-h-screen">
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
        <Route path="/" element={<Home />} />
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
    </div>  
  );
}

export default App;