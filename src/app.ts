import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { validateRequest } from './middleware/validateRequest';
import { body } from 'express-validator';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.post(
  '/api/v1/validate',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  (req, res) => {
    res.json({ message: 'Validation successful' });
  }
);

// Error handling middleware
app.use(errorHandler);

export default app; 