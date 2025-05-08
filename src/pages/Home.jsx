import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [showStatistics, setShowStatistics] = useState(false);
  
  // Icon declarations
  const FileIcon = getIcon('FileText');
  const ChartIcon = getIcon('BarChart');
  const DatabaseIcon = getIcon('Database');
  const ShieldIcon = getIcon('Shield');
  const SparklesIcon = getIcon('Sparkles');
  
  // Statistics data for file storage
  const statistics = {
    totalUploads: 127,
    successRate: 99.2,
    averageSize: '3.4MB',
    maxFileSize: '50MB'
  };
  
  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
    if (!showStatistics) {
      toast.info("Statistics panel opened", {
        icon: <ChartIcon className="h-5 w-5" />
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero section with heading */}
      <header className="bg-gradient-to-br from-primary/90 to-primary-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm"
              >
                <FileIcon className="h-12 w-12 md:h-16 md:w-16" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Secure File Management with DropVault
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Upload, organize, and share your files with confidence
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white text-primary hover:bg-white/90"
                onClick={toggleStatistics}
              >
                <div className="flex items-center gap-2">
                  <ChartIcon className="h-5 w-5" />
                  <span>View Statistics</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Statistics section (conditionally rendered) */}
      {showStatistics && (
        <motion.section 
          className="py-12 bg-surface-100 dark:bg-surface-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">System Statistics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6 flex flex-col items-center">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Total Uploads</h3>
                <p className="text-3xl font-bold text-primary mt-2">{statistics.totalUploads}</p>
              </div>
              
              <div className="card p-6 flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                  <ShieldIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">Success Rate</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{statistics.successRate}%</p>
              </div>
              
              <div className="card p-6 flex flex-col items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <DatabaseIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">Average Size</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{statistics.averageSize}</p>
              </div>
              
              <div className="card p-6 flex flex-col items-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
                  <SparklesIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Max File Size</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{statistics.maxFileSize}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline"
                onClick={toggleStatistics}
              >
                Hide Statistics
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Main feature section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <MainFeature />
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              DropVault combines powerful functionality with an intuitive interface to streamline your file management workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            <div className="card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <FileIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Uploading</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Drag and drop any file to instantly upload. Support for all common file formats.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <ShieldIcon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
              <p className="text-surface-600 dark:text-surface-300">
                All files are encrypted and securely stored with enterprise-grade protection.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-accent/10 dark:bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <DatabaseIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Management</h3>
              <p className="text-surface-600 dark:text-surface-300">
                Organize files with tags, folders, and smart search to find what you need quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold flex items-center">
                <FileIcon className="h-6 w-6 mr-2" />
                DropVault
              </h2>
              <p className="text-surface-300 mt-2">Secure file management made simple</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-surface-300">© 2023 DropVault. All rights reserved.</p>
              <p className="text-surface-400 text-sm mt-1">A Modern File Management System</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;