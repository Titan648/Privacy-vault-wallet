import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, EyeOff, Eye } from 'lucide-react';
import { GoldRushClient } from '@covalenthq/client-sdk';
import { usePrivy } from '@privy-io/react-auth';
import { useWalletStore } from '../store/walletStore';
import './AssetList.css';

function AssetList() {
  const { user } = usePrivy();
  const { privacyMode, hiddenAssets, hideAsset, unhideAsset, selectedChain } = useWalletStore();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const walletAddress = user?.wallet?.address || user?.linkedAccounts?.find(acc => acc.type === 'wallet')?.address;
  const apiKey = import.meta.env.VITE_GOLDRUSH_API_KEY || 'cqt_rQPmxvJYwWrh7bk39pc96CvgKmkH';

  useEffect(() => {
    const fetchAssets = async () => {
      if (!walletAddress) return;
      
      try {
        setLoading(true);
        const client = new GoldRushClient(apiKey);
        const resp = await client.BalanceService.getTokenBalancesForWalletAddress(
          selectedChain,
          walletAddress
        );
        
        if (!resp.error && resp.data) {
          const formattedAssets = resp.data.items
            .filter(item => parseFloat(item.quote || 0) > 0.01)
            .map(item => ({
              id: item.contract_address,
              name: item.contract_name,
              symbol: item.contract_ticker_symbol,
              balance: parseFloat(item.balance) / Math.pow(10, item.contract_decimals),
              value: parseFloat(item.quote || 0),
              price: parseFloat(item.quote_rate || 0),
              change24h: parseFloat(item.quote_rate_24h || 0),
              logo: item.logo_url
            }))
            .sort((a, b) => b.value - a.value);
          
          setAssets(formattedAssets);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [walletAddress, selectedChain, apiKey]);

  const toggleAssetVisibility = (assetId) => {
    if (hiddenAssets.includes(assetId)) {
      unhideAsset(assetId);
    } else {
      hideAsset(assetId);
    }
  };

  const formatCurrency = (value) => {
    if (privacyMode) return '••••••';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatBalance = (balance) => {
    if (privacyMode) return '••••';
    return balance.toFixed(4);
  };

  if (loading) {
    return (
      <div className="asset-list">
        <div className="section-header">
          <h2>Your Assets</h2>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="asset-skeleton">
            <div className="skeleton-line" style={{ width: '60px', height: '60px', borderRadius: '12px' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton-line" style={{ width: '40%', height: '16px', marginBottom: '8px' }} />
              <div className="skeleton-line" style={{ width: '30%', height: '14px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="asset-list">
      <div className="section-header">
        <h2>Your Assets</h2>
        <span className="asset-count">{assets.length} tokens</span>
      </div>

      <div className="assets-container">
        {assets.map((asset, index) => {
          const isHidden = hiddenAssets.includes(asset.id);
          
          return (
            <motion.div
              key={asset.id}
              className={`asset-item ${isHidden ? 'hidden' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="asset-main">
                <div className="asset-icon">
                  {asset.logo ? (
                    <img src={asset.logo} alt={asset.symbol} />
                  ) : (
                    <div className="asset-icon-placeholder">
                      {asset.symbol?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                
                <div className="asset-info">
                  <div className="asset-name">{asset.name || asset.symbol}</div>
                  <div className="asset-balance">
                    {formatBalance(asset.balance)} {asset.symbol}
                  </div>
                </div>
                
                <div className="asset-value">
                  <div className="asset-price">{formatCurrency(asset.value)}</div>
                  <div className={`asset-change ${asset.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {privacyMode ? '•••' : `${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%`}
                  </div>
                </div>
              </div>

              <div className="asset-actions">
                <button 
                  className="asset-action-btn"
                  onClick={() => toggleAssetVisibility(asset.id)}
                >
                  {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button className="asset-action-btn">
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {assets.length === 0 && (
        <div className="empty-state">
          <p>No assets found</p>
          <span>Your tokens will appear here</span>
        </div>
      )}
    </div>
  );
}

export default AssetList;
