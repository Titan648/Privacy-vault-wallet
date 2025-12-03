import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import WalletOverview from './WalletOverview';
import AssetList from './AssetList';
import PrivacyControls from './PrivacyControls';
import Navigation from './Navigation';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('assets');

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-content">
        <WalletOverview />
        
        <AnimatePresence mode="wait">
          {activeTab === 'assets' && (
            <motion.div
              key="assets"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <AssetList />
            </motion.div>
          )}
          
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PrivacyControls />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Dashboard;
