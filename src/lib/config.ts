import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
config();

// Environment variables schema
const envSchema = z.object({
  // Blockchain Node URLs
  INFURA_URL: z.string().url().min(1),
  ALCHEMY_URL: z.string().url().min(1),

  // API Keys
  OPEN_EXCHANGE_RATES_API_KEY: z.string().min(1),

  // Database
  MONGODB_URI: z.string().min(1),

  // Application
  VITE_APP_NAME: z.string().default('Metalink'),
  VITE_APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_APP_PORT: z.coerce.number().default(8080),

  // Smart Contract
  VITE_CONTRACT_ADDRESS: z.string().min(1),

  // Security
  VITE_JWT_SECRET: z.string().min(32),

  // Rate Limiting
  VITE_RATE_LIMIT_WINDOW: z.coerce.number().default(900000),
  VITE_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100)
});

// Parse and validate environment variables
const parseEnvVariables = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.'));
      throw new Error(
        `Missing or invalid environment variables: ${missingVars.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set correctly.'
      );
    }
    throw error;
  }
};

// Export validated environment variables
export const env = parseEnvVariables();