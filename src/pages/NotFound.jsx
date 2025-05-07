import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const navigate = useNavigate();
  
  // Icon declarations
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  // Auto-redirect after 10 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="card p-8 text-center">
          <motion.div 
            className="flex justify-center mb-6"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatType: "loop" 
            }}
          >
            <div className="h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangleIcon className="h-12 w-12 text-red-500" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-surface-600 dark:text-surface-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
            You'll be redirected to the home page in a few seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
              <HomeIcon className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;