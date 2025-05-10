import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext } from '../App';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Dashboard() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);
  
  // Icon declarations
  const FileIcon = getIcon('FileText');
  const UserIcon = getIcon('User');
  const LogOutIcon = getIcon('LogOut');
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header with user info */}
      <header className="bg-gradient-to-br from-primary/90 to-primary-dark text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileIcon className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">DropVault</h1>
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-white/20 rounded-lg py-2 px-4 hover:bg-white/30 transition-colors"
                onClick={() => setShowUserInfo(!showUserInfo)}
              >
                <UserIcon className="h-5 w-5" />
                <span>{user?.firstName || 'User'}</span>
              </button>
              
              {showUserInfo && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 bg-white dark:bg-surface-800 text-surface-800 dark:text-white rounded-lg shadow-lg p-4 min-w-[200px] z-10"
                >
                  <div className="mb-3 pb-3 border-b border-surface-200 dark:border-surface-700">
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-surface-600 dark:text-surface-400">{user?.emailAddress}</p>
                  </div>
                  <button 
                    className="flex items-center text-red-500 hover:text-red-600 w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Your Files</h2>
            <MainFeature />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;