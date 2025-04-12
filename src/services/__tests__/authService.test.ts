import { authService } from '../authService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        createdAt: new Date()
      };

      const mockResponse = {
        data: {
          user: mockUser,
          token: 'mock-token'
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        {
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser'
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle registration errors', async () => {
      const error = new Error('Registration failed');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(authService.register({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      })).rejects.toThrow('Registration failed');
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        createdAt: new Date()
      };

      const mockResponse = {
        data: {
          user: mockUser,
          token: 'mock-token'
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        {
          email: 'test@example.com',
          password: 'password123'
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle login errors', async () => {
      const error = new Error('Login failed');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(authService.login({
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow('Login failed');
    });
  });

  describe('token management', () => {
    it('should set and get token correctly', () => {
      authService.setToken('test-token');
      expect(authService.getToken()).toBe('test-token');
    });

    it('should return null when no token is set', () => {
      expect(authService.getToken()).toBeNull();
    });
  });

  describe('user management', () => {
    it('should set and get user correctly', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        createdAt: new Date()
      };

      authService.setUser(mockUser);
      expect(authService.getUser()).toEqual(mockUser);
    });

    it('should return null when no user is set', () => {
      expect(authService.getUser()).toBeNull();
    });
  });

  describe('authentication status', () => {
    it('should return true when token exists', () => {
      authService.setToken('test-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
}); 