import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import { useWalletStore } from './store/walletStore';

function App() {
  const { ready, authenticated, user } = usePrivy();
  const { setUser } = useWalletStore();

  useEffect(() => {
    if (authenticated && user) {
      setUser(user);
    }
  }, [authenticated, user, setUser]);

  if (!ready) {
    return (
      <div className="app-container">
        <div className="bg-gradient" />
        <div className="content" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              border: '3px solid var(--accent-primary)', 
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="bg-gradient" />
      <div className="content">
        {!authenticated ? <WelcomeScreen /> : <Dashboard />}
      </div>
    </div>
  );
}

export default App;
