import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Fingerprint, Key, AlertTriangle } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import './PrivacyControls.css';

function PrivacyControls() {
  const { privacyMode, togglePrivacyMode, hiddenAssets } = useWalletStore();

  const privacyFeatures = [
    {
      icon: Eye,
      title: 'Privacy Mode',
      description: 'Hide all balances and sensitive data',
      active: privacyMode,
      action: togglePrivacyMode
    },
    {
      icon: Lock,
      title: 'Biometric Lock',
      description: 'Require fingerprint to access wallet',
      active: true,
      badge: 'Active'
    },
    {
      icon: Key,
      title: 'Private Key Export',
      description: 'Securely backup your private keys',
      action: () => alert('Private key export coming soon')
    },
    {
      icon: Shield,
      title: 'Transaction Privacy',
      description: 'Enhanced privacy for transactions',
      badge: 'Pro'
    }
  ];

  const securityMetrics = [
    { label: 'Hidden Assets', value: hiddenAssets.length },
    { label: 'Security Score', value: '98/100' },
    { label: 'Last Backup', value: '2 days ago' }
  ];

  return (
    <div className="privacy-controls">
      <div className="section-header">
        <h2>Privacy & Security</h2>
      </div>

      <motion.div 
        className="security-score-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="score-icon">
          <Shield size={32} />
        </div>
        <div className="score-info">
          <div className="score-label">Security Score</div>
          <div className="score-value">Excellent</div>
        </div>
        <div className="score-badge">98/100</div>
      </motion.div>

      <div className="privacy-features">
        {privacyFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="privacy-feature-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="feature-icon">
              <feature.icon size={20} />
            </div>
            <div className="feature-content">
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
            </div>
            <div className="feature-control">
              {feature.action ? (
                <button 
                  className={`toggle-switch ${feature.active ? 'active' : ''}`}
                  onClick={feature.action}
                >
                  <div className="toggle-slider" />
                </button>
              ) : feature.badge ? (
                <span className="feature-badge">{feature.badge}</span>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="security-metrics">
        <h3>Security Metrics</h3>
        <div className="metrics-grid">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        className="security-tip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AlertTriangle size={18} />
        <div>
          <strong>Security Tip:</strong> Never share your private keys or seed phrase with anyone.
        </div>
      </motion.div>
    </div>
  );
}

export default PrivacyControls;
