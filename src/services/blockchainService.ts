
import { toast } from "@/hooks/use-toast";

// Interface for transaction objects
export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  hash?: string;
  networkFee?: string;
}

// Define supported currencies
export const SUPPORTED_CURRENCIES = ['BRL', 'RUB', 'INR', 'CNY', 'ZAR'];

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum?.isMetaMask;
};

// Fetch current network
export const getCurrentNetwork = async (): Promise<{chainId: string, name: string}> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    let name = 'Unknown Network';

    // Map chain IDs to network names
    switch (chainId) {
      case '0x1':
        name = 'Ethereum Mainnet';
        break;
      case '0x3':
        name = 'Ropsten Testnet';
        break;
      case '0x4':
        name = 'Rinkeby Testnet';
        break;
      case '0x5':
        name = 'Goerli Testnet';
        break;
      case '0x89':
        name = 'Polygon Mainnet';
        break;
      default:
        name = `Chain ID: ${chainId}`;
    }
    
    return { chainId, name };
  } catch (error) {
    console.error('Error getting network:', error);
    throw error;
  }
};

// Get account balance
export const getBalance = async (address: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    });
    
    // Convert from wei to ether
    const etherValue = parseInt(balance, 16) / 1e18;
    return etherValue.toFixed(4);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
};

// Send transaction
export const sendTransaction = async (
  fromAddress: string,
  toAddress: string,
  amount: string,
  currency: string
): Promise<Transaction> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
  
  try {
    // This is a simplified example. In a real app, we would:
    // 1. Convert the amount to the proper decimal places based on the token
    // 2. Check for sufficient balance
    // 3. Potentially use a smart contract for token transfers
    
    // For demo purposes, we'll use ETH transfer
    const amountInWei = (parseFloat(amount) * 1e18).toString(16);
    
    const transactionParameters = {
      from: fromAddress,
      to: toAddress,
      value: `0x${amountInWei}`, // Value in hex
      gas: '0x5208', // 21000 gas in hex
    };
    
    // Send the transaction
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    
    // Create transaction record
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      from: fromAddress,
      to: toAddress,
      amount,
      currency,
      status: 'pending',
      timestamp: Date.now(),
      hash: txHash,
      networkFee: '0.00021' // Simplified; would be calculated in real app
    };
    
    // In a real app, we would save this transaction to a database
    // For demo, we show a toast
    toast({
      title: "Transaction Sent",
      description: `Your ${currency} transaction has been submitted to the blockchain.`,
    });
    
    return transaction;
  } catch (error) {
    console.error('Error sending transaction:', error);
    
    // Show error toast
    toast({
      title: "Transaction Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    
    throw error;
  }
};

// Exchange between BRICS currencies
export const exchangeCurrency = async (
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  fromAddress: string
): Promise<Transaction> => {
  if (!SUPPORTED_CURRENCIES.includes(fromCurrency) || !SUPPORTED_CURRENCIES.includes(toCurrency)) {
    throw new Error('Unsupported currency pair');
  }
  
  try {
    // In a real app, this would interact with a DEX or custom exchange smart contract
    // For demo purposes, we'll simulate a successful exchange
    
    // Get simulated exchange rate
    const exchangeRate = getSimulatedExchangeRate(fromCurrency, toCurrency);
    const receivedAmount = (parseFloat(amount) * exchangeRate).toFixed(2);
    
    // Create transaction record
    const transaction: Transaction = {
      id: `ex-${Date.now()}`,
      from: fromAddress,
      to: fromAddress, // Self-transaction for exchange
      amount: `${amount} ${fromCurrency} → ${receivedAmount} ${toCurrency}`,
      currency: `${fromCurrency}/${toCurrency}`,
      status: 'completed',
      timestamp: Date.now(),
    };
    
    toast({
      title: "Exchange Completed",
      description: `Successfully exchanged ${amount} ${fromCurrency} to ${receivedAmount} ${toCurrency}.`,
    });
    
    return transaction;
  } catch (error) {
    console.error('Error during exchange:', error);
    
    toast({
      title: "Exchange Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    
    throw error;
  }
};

// Helper function to get simulated exchange rates
const getSimulatedExchangeRate = (fromCurrency: string, toCurrency: string): number => {
  // These would be fetched from an API in a real app
  const usdRates: Record<string, number> = {
    'BRL': 0.19, // 1 BRL = 0.19 USD
    'RUB': 0.011, // 1 RUB = 0.011 USD
    'INR': 0.012, // 1 INR = 0.012 USD
    'CNY': 0.14, // 1 CNY = 0.14 USD
    'ZAR': 0.055, // 1 ZAR = 0.055 USD
  };
  
  // Convert from source currency to USD, then to target currency
  const sourceToUSD = usdRates[fromCurrency];
  const usdToTarget = 1 / usdRates[toCurrency];
  
  return sourceToUSD * usdToTarget;
};

// Get recent transactions (simulated)
export const getRecentTransactions = (address: string): Transaction[] => {
  // In a real app, this would fetch from a backend or blockchain explorer
  // For demo purposes, we're returning mock data
  return [
    {
      id: 'tx1',
      from: address,
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      amount: '250',
      currency: 'BRL',
      status: 'completed',
      timestamp: Date.now() - 86400000, // 1 day ago
      hash: '0x7a9f12541df6276a59cc21dfb4c46983dc7eaa34a4db0a324f7738011d584a2d'
    },
    {
      id: 'tx2',
      from: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      to: address,
      amount: '3000',
      currency: 'RUB',
      status: 'completed',
      timestamp: Date.now() - 172800000, // 2 days ago
      hash: '0x8b9c12341df6276a79ee21afb4c46983fc7daa34a4db0a324f7738011d584c5e'
    },
    {
      id: 'ex1',
      from: address,
      to: address,
      amount: '1500 INR → 328.5 BRL',
      currency: 'INR/BRL',
      status: 'completed',
      timestamp: Date.now() - 259200000, // 3 days ago
      hash: '0x9c9c12541df6276a59cc21dfb4c46983dc7eab94a4db0a324f7738011d584f7a'
    }
  ];
};
