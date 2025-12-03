import { usePrivy } from '@privy-io/react-auth';
import { motion } from 'framer-motion';
import { LogOut, Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import './Header.css';

function Header() {
  const { logout, user } = usePrivy();
  const { privacyMode, togglePrivacyMode } = useWalletStore();
  const [copied, setCopied] = useState(false);

  const walletAddress = user?.wallet?.address || user?.linkedAccounts?.find(acc => acc.type === 'wallet')?.address;

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-small">
            <Shield size={24} strokeWidth={1.5} />
          </div>
          <div className="wallet-info">
            <span className="wallet-label">Wallet</span>
            {walletAddress && (
              <button className="address-button" onClick={handleCopy}>
                <span>{privacyMode ? '••••••••••' : formatAddress(walletAddress)}</span>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            )}
          </div>
        </div>
        
        <div className="header-right">
          <motion.button
            className={`privacy-toggle ${privacyMode ? 'active' : ''}`}
            onClick={togglePrivacyMode}
            whileTap={{ scale: 0.95 }}
          >
            <Shield size={18} />
          </motion.button>
          
          <motion.button
            className="logout-button"
            onClick={logout}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default Header;
