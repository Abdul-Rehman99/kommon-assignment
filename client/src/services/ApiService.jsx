// apiService.js
import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class ApiService {
  static async register(userData) {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  static async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  static async getFeedback(input, token) {
    try {
      const response = await api.post(
        '/api/feedback',
        { input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get feedback');
    }
  }

  static async getHistory(token) {
    try {
      const response = await api.get('/api/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch history');
    }
  }
}

export default ApiService;
