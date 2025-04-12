
import { CurrencyData } from '@/components/CurrencyCard';

export const CURRENCIES: CurrencyData[] = [
  {
    code: 'BRL',
    name: 'Brazilian Real',
    balance: 5000,
    symbol: 'R$',
    flag: '🇧🇷',
    change: 0.75,
    value: 937.5
  },
  {
    code: 'RUB',
    name: 'Russian Ruble',
    balance: 67250,
    symbol: '₽',
    flag: '🇷🇺',
    change: -0.42,
    value: 685.2
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    balance: 75000,
    symbol: '₹',
    flag: '🇮🇳',
    change: 1.25,
    value: 893.45
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    balance: 6300,
    symbol: '¥',
    flag: '🇨🇳',
    change: 0.32,
    value: 865.75
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    balance: 15250,
    symbol: 'R',
    flag: '🇿🇦',
    change: -0.85,
    value: 792.5
  }
];

export const TRANSACTIONS = [
  {
    id: 'tx1',
    type: 'send',
    amount: '250 BRL',
    valueUSD: '46.85',
    currency: 'BRL',
    flag: '🇧🇷',
    date: '2023-04-10',
    status: 'completed',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  },
  {
    id: 'tx2',
    type: 'receive',
    amount: '3000 RUB',
    valueUSD: '32.45',
    currency: 'RUB',
    flag: '🇷🇺',
    date: '2023-04-08',
    status: 'completed',
    address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed'
  },
  {
    id: 'tx3',
    type: 'exchange',
    amount: '1500 INR',
    valueUSD: '18.75',
    currency: 'INR',
    flag: '🇮🇳',
    date: '2023-04-05',
    status: 'completed',
    address: 'BRL ↔ INR'
  },
  {
    id: 'tx4',
    type: 'send',
    amount: '500 CNY',
    valueUSD: '78.25',
    currency: 'CNY',
    flag: '🇨🇳',
    date: '2023-04-03',
    status: 'pending',
    address: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72'
  },
  {
    id: 'tx5',
    type: 'receive',
    amount: '1750 ZAR',
    valueUSD: '92.45',
    currency: 'ZAR',
    flag: '🇿🇦',
    date: '2023-03-28',
    status: 'completed',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  }
];
