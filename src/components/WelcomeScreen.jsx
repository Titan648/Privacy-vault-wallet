import { usePrivy } from '@privy-io/react-auth';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Fingerprint } from 'lucide-react';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const { login } = usePrivy();

  const features = [
    { icon: Shield, text: 'Military-grade encryption' },
    { icon: Lock, text: 'Self-custody control' },
    { icon: Eye, text: 'Privacy-first design' },
    { icon: Fingerprint, text: 'Biometric security' }
  ];

  return (
    <div className="welcome-screen">
      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="logo-icon">
            <Shield size={48} strokeWidth={1.5} />
          </div>
          <h1 className="logo-text">PrivacyVault</h1>
          <p className="tagline">Next-Gen Self-Custody</p>
        </motion.div>

        <motion.div 
          className="features-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <feature.icon size={20} strokeWidth={1.5} />
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="cta-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button className="primary-button" onClick={login}>
            <span>Enter Vault</span>
            <div className="button-glow" />
          </button>
          
          <p className="disclaimer">
            Your keys, your crypto. We never have access to your funds.
          </p>
        </motion.div>

        <motion.div 
          className="security-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Lock size={14} />
          <span>End-to-end encrypted</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;
