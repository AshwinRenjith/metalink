
import { toast } from "@/hooks/use-toast";

import { ethers } from 'ethers';

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

// ABI for the smart contract
const CONTRACT_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

// Contract addresses for different tokens on Goerli testnet
const TOKEN_CONTRACTS = {
  BRL: '0x...', // Replace with actual token contract address
  RUB: '0x...', // Replace with actual token contract address
  INR: '0x...', // Replace with actual token contract address
  CNY: '0x...', // Replace with actual token contract address
  ZAR: '0x...'  // Replace with actual token contract address
};

// Provider and contract instances
let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;
let contracts: { [key: string]: ethers.Contract } = {};

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

// Get token balance
export const getBalance = async (address: string, currency: string): Promise<string> => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }
  
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    const contractAddress = TOKEN_CONTRACTS[currency];
    if (!contractAddress) {
      throw new Error(`No contract address found for ${currency}`);
    }

    if (!contracts[currency]) {
      contracts[currency] = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);
    }

    const decimals = await contracts[currency].decimals();
    const balance = await contracts[currency].balanceOf(address);
    
    // Convert from token units to decimal representation
    const formattedBalance = ethers.utils.formatUnits(balance, decimals);
    return parseFloat(formattedBalance).toFixed(4);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
};

// Send transaction using smart contract
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
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    if (!signer) {
      signer = provider.getSigner();
    }

    const contractAddress = TOKEN_CONTRACTS[currency];
    if (!contractAddress) {
      throw new Error(`No contract address found for ${currency}`);
    }

    if (!contracts[currency]) {
      contracts[currency] = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    }

    // Get token decimals
    const decimals = await contracts[currency].decimals();
    
    // Convert amount to token units
    const amountInTokenUnits = ethers.utils.parseUnits(amount, decimals);
    
    // Estimate gas
    const gasEstimate = await contracts[currency].estimateGas.transfer(toAddress, amountInTokenUnits);
    const gasLimit = gasEstimate.mul(110).div(100); // Add 10% buffer

    // Send the transaction
    const tx = await contracts[currency].transfer(toAddress, amountInTokenUnits, {
      gasLimit
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
      hash: tx.hash,
      networkFee: ethers.utils.formatEther(tx.gasLimit.mul(tx.gasPrice || 0))
    };
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      toast({
        title: "Transaction Successful",
        description: `Your ${currency} transaction has been confirmed on the blockchain.`,
      });
      transaction.status = 'completed';
    } else {
      toast({
        title: "Transaction Failed",
        description: "Transaction was reverted by the network.",
        variant: "destructive"
      });
      transaction.status = 'failed';
    }
    
    return transaction;
  } catch (error) {
    console.error('Error sending transaction:', error);
    
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
