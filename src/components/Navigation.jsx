import { motion } from 'framer-motion';
import { Wallet, Shield, Send, Settings } from 'lucide-react';
import './Navigation.css';

function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'assets', icon: Wallet, label: 'Assets' },
    { id: 'privacy', icon: Shield, label: 'Privacy' },
    { id: 'send', icon: Send, label: 'Send' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-content">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={22} strokeWidth={1.5} />
            <span>{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                className="nav-indicator"
                layoutId="nav-indicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
