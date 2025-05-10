import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const FileIcon = getIcon('FileX');
  const HomeIcon = getIcon('Home');

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-surface-800 rounded-xl shadow-card p-8 text-center"
      >
        <FileIcon className="h-20 w-20 mx-auto text-primary mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-surface-800 dark:text-surface-100">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <HomeIcon className="h-5 w-5 mr-2" />
          <span>Go to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;