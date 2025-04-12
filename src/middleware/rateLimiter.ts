import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
export const applyRateLimiting = (req: Request, res: Response, next: NextFunction) => {
  limiter(req, res, next);
};

// Special rate limit for sensitive routes (login, register, etc.)
export const sensitiveRouteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per hour
  message: 'Too many attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
}); 