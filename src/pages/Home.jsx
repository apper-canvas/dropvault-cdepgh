import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimate } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [showStatistics, setShowStatistics] = useState(false);
  const heroRef = useRef(null);
  const [typingScope, animateTyping] = useAnimate();
  const [bounceScope, animateBounce] = useAnimate();
  
  // Icon declarations
  const FileIcon = getIcon('FileText');
  const ChartIcon = getIcon('BarChart');
  const DatabaseIcon = getIcon('Database');
  const ShieldIcon = getIcon('Shield');
  const SparklesIcon = getIcon('Sparkles');
  const UploadIcon = getIcon('UploadCloud');
  
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
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Typewriter animation
  useState(() => {
    const sequence = [
      [typingScope.current, { width: "0%" }, { duration: 0 }],
      [typingScope.current, { width: "100%" }, { duration: 1.5, ease: "easeInOut" }],
      // Bounce animation for emoji
      [
        bounceScope.current, 
        { y: [0, -15, 0], scale: [1, 1.2, 1] }, 
        { duration: 0.6, ease: "easeInOut", delay: 1.5 }
      ]
    ];
    
    animateTyping(sequence);
  }, []);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const handleUploadClick = () => {
    toast.success("Upload feature initiated!", {
      icon: <UploadIcon className="h-5 w-5" />
    });
    // In a real app, this would navigate to or open the upload interface
  };

  return (
    <div className="min-h-screen">
      {/* Hero section with heading */}
      <header 
        ref={heroRef} 
        className="relative overflow-hidden text-white min-h-[80vh] flex items-center bg-primary-dark"
      >
        {/* Parallax background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark"></div>
          
          {/* Decorative elements with parallax effect */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
              x: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-primary-light/10 blur-3xl"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
              x: useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
            }}
          ></motion.div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0xMC02aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0tMi04aDZ2MWgtNnYtMXptMC0yaDF2NmgtMXYtNnptMi0yaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yLTJoMXY1aC0xdi01em0tMTQgMjBoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0yLTJoMXYxaC0xdi0xem0tMiAwaDFoLTF6bS0yLTJoMXY1aC0xdi01em0xMC02aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMGgxdi0xem0tMi0yaDF2NWgtMXYtNXptLTItOGg2djFoLTZ2LTF6bTAtMmgxdjZoLTF2LTZ6bTItMmgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMi0yaDFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        </motion.div>
        
        {/* Content with parallax effect */}
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <motion.div
            style={{ 
              y: textY, 
              opacity: fadeOut,
              scale: scale
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-lg"
              >
                <FileIcon className="h-12 w-12 md:h-16 md:w-16" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="block mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-white">
                  Elevate Your Files
                </span>
              </span>
              
              <span className="block mb-2 relative overflow-hidden">
                <span ref={bounceScope} className="inline-block mr-2">🚀</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-amber-300 drop-shadow-sm">
                  Simplified
                </span>
                <span className="text-white"> Storage </span>
              </span>
              
              <span className="block relative overflow-hidden">
                <span className="relative inline-flex items-center">
                  <span className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">with DropVault's </span>
                  <span ref={typingScope} className="relative overflow-hidden inline-block whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-secondary-light to-secondary">
                    secure management
                  </span>
                </span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-10"
            >
              Upload, organize, and share your files with confidence
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-accent text-white hover:bg-amber-500 py-3 px-8 text-lg shadow-lg"
                onClick={handleUploadClick}
              >
                <div className="flex items-center gap-2">
                  <UploadIcon className="h-5 w-5" />
                  <span>Start Uploading</span>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 py-3 px-6 text-lg"
                onClick={toggleStatistics}
              >
                <div className="flex items-center gap-2">
                  <ChartIcon className="h-5 w-5" />
                  <span>View Statistics</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Statistics section (conditionally rendered) */}
      {showStatistics && (
        <motion.section 
          className="py-12 bg-surface-100 dark:bg-surface-800 relative z-20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 relative z-10">
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