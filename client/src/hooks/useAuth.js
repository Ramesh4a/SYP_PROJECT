import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserProvider } from 'ethers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Web3 and check for existing wallet connection
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
          // Get the provider
          const provider = new BrowserProvider(window.ethereum);
          
          // Check if already connected
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            // User is already connected with MetaMask
            const address = accounts[0].address;
            // You might want to fetch additional user data from your backend here
            setUser({ address });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new BrowserProvider(window.ethereum);
        // Request account access
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        // You might want to make an API call to your backend here to create/update user
        setUser({ address });
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error('Please install MetaMask');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  };

  // Disconnect wallet function
  const disconnect = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Sign message function (useful for authentication)
  const signMessage = async (message) => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');
      
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    connectWallet,
    disconnect,
    signMessage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
