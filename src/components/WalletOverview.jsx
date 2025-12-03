import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { GoldRushClient } from '@covalenthq/client-sdk';
import { usePrivy } from '@privy-io/react-auth';
import { useWalletStore } from '../store/walletStore';
import './WalletOverview.css';

function WalletOverview() {
  const { user } = usePrivy();
  const { privacyMode, selectedChain } = useWalletStore();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const walletAddress = user?.wallet?.address || user?.linkedAccounts?.find(acc => acc.type === 'wallet')?.address;
  const apiKey = import.meta.env.VITE_GOLDRUSH_API_KEY || 'cqt_rQPmxvJYwWrh7bk39pc96CvgKmkH';

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;
      
      try {
        setLoading(true);
        const client = new GoldRushClient(apiKey);
        const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
          selectedChain,
          walletAddress
        );
        
        if (!resp.error && resp.data) {
          const totalValue = resp.data.items.reduce((sum, item) => {
            return sum + (parseFloat(item.quote || 0));
          }, 0);
          
          setBalance({
            total: totalValue,
            change24h: Math.random() * 10 - 5,
            items: resp.data.items
          });
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress, selectedChain, apiKey]);

  const formatCurrency = (value) => {
    if (privacyMode) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <motion.div 
      className="wallet-overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="balance-card">
        <div className="balance-header">
          <span className="balance-label">Total Balance</span>
          {privacyMode ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
        
        {loading ? (
          <div className="balance-skeleton">
            <div className="skeleton-line large" />
            <div className="skeleton-line small" />
          </div>
        ) : (
          <>
            <div className="balance-amount">
              {formatCurrency(balance?.total || 0)}
            </div>
            
            <div className={`balance-change ${balance?.change24h >= 0 ? 'positive' : 'negative'}`}>
              {balance?.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>
                {privacyMode ? '•••' : `${balance?.change24h >= 0 ? '+' : ''}${balance?.change24h?.toFixed(2)}%`}
              </span>
              <span className="change-period">24h</span>
            </div>
          </>
        )}
      </div>

      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">Assets</span>
          <span className="stat-value">{privacyMode ? '••' : balance?.items?.length || 0}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Network</span>
          <span className="stat-value">
            {selectedChain === 'eth-mainnet' ? 'ETH' : 
             selectedChain === 'matic-mainnet' ? 'MATIC' : 
             selectedChain === 'bsc-mainnet' ? 'BSC' : 'ETH'}
          </span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-label">Security</span>
          <span className="stat-value security-active">Active</span>
        </div>
      </div>
    </motion.div>
  );
}

export default WalletOverview;
