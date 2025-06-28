import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ApiService from '../../services/ApiService';
import AuthService from '../../services/AuthService';

// Login Component
const Login = ({ onSwitchToRegister, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);

    ApiService.login(formData)
      .then(response => {
        AuthService.setToken(response.token);
        AuthService.setUser({
          id: response._id,
          name: response.name,
          email: response.email
        });

        toast.success('Login successful!');
        onSuccess();
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button onClick={handleSubmit} loading={loading}>
            Sign In
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;