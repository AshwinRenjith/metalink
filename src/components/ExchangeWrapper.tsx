import React, { useState, useEffect } from 'react';
import ExchangeForm from './ExchangeForm';
import { useWallet } from '@/hooks/useWallet';
import { exchangeCurrency, getBalance, sendTransaction } from '@/services/blockchainService';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const ExchangeWrapper = () => {
  const { isConnected, account, connectWallet } = useWallet();
  const [isExchanging, setIsExchanging] = useState(false);
  const [balances, setBalances] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    const loadBalances = async () => {
      if (isConnected && account) {
        try {
          const balancePromises = ['BRL', 'RUB', 'INR', 'CNY', 'ZAR'].map(currency =>
            getBalance(account, currency)
          );
          const results = await Promise.all(balancePromises);
          const newBalances = ['BRL', 'RUB', 'INR', 'CNY', 'ZAR'].reduce((acc, curr, idx) => {
            acc[curr] = results[idx];
            return acc;
          }, {} as {[key: string]: string});
          setBalances(newBalances);
        } catch (error) {
          console.error('Error loading balances:', error);
        }
      }
    };
    
    loadBalances();
  }, [isConnected, account]);

  const handleExchange = async (
    fromCurrency: string, 
    toCurrency: string, 
    amount: string
  ) => {
    if (!isConnected || !account) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed with the exchange.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsExchanging(true);
      
      // First check if user has sufficient balance
      const balance = balances[fromCurrency] || '0';
      if (parseFloat(balance) < parseFloat(amount)) {
        throw new Error(`Insufficient ${fromCurrency} balance`);
      }
      
      // Execute the token transfer using smart contract
      const tx = await sendTransaction(account, account, amount, fromCurrency);
      
      // After successful transfer, execute the exchange
      await exchangeCurrency(fromCurrency, toCurrency, amount, account);
      
      toast({
        title: "Exchange Successful",
        description: `Transaction hash: ${tx.hash}\nExchanged ${amount} ${fromCurrency} to ${toCurrency}.`
      });
      
      // Refresh balances after exchange
      const newFromBalance = await getBalance(account, fromCurrency);
      const newToBalance = await getBalance(account, toCurrency);
      setBalances(prev => ({
        ...prev,
        [fromCurrency]: newFromBalance,
        [toCurrency]: newToBalance
      }));
      
    } catch (error) {
      console.error("Exchange error:", error);
      toast({
        title: "Exchange Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsExchanging(false);
    }
  };
  
  // If wallet not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
        <p className="text-slate-300 mb-6">
          Please connect your wallet to access the exchange functionality.
        </p>
        <Button onClick={connectWallet} className="metalink-button">
          Connect Wallet
        </Button>
      </div>
    );
  }
  
  // Overlay with loading state when exchange is in progress
  if (isExchanging) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-metalink-gold mx-auto mb-4" />
            <h3 className="text-white font-bold">Processing Exchange</h3>
            <p className="text-slate-300 mt-2">Please wait while your transaction is being processed...</p>
          </div>
        </div>
        
        {/* Keep the form visible but disabled */}
        <div className="opacity-50 pointer-events-none">
          <ExchangeForm />
        </div>
      </div>
    );
  }
  
  // Default state - form is enabled and ready for input
  return <ExchangeForm onExchange={handleExchange} />;
};

export default ExchangeWrapper;
