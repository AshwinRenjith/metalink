
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useWallet = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Check if already connected
      checkConnection();
      
      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount(null);
          toast({
            title: "Disconnected",
            description: "Your wallet has been disconnected.",
            variant: "destructive"
          });
        } else {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [toast]);
  
  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
          
          toast({
            title: "Connected",
            description: "Your wallet has been connected successfully.",
          });
        }
      } catch (error: any) {
        // User rejected the request
        if (error.code === 4001) {
          toast({
            title: "Connection Rejected",
            description: "You rejected the connection request.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Connection Failed",
            description: "There was an error connecting to your wallet.",
            variant: "destructive"
          });
        }
        console.error("Error connecting wallet:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive"
      });
    }
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    
    toast({
      title: "Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };
  
  return {
    isConnected,
    account,
    isLoading,
    connectWallet,
    disconnectWallet
  };
};
