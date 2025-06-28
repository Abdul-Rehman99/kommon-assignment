import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import ApiService from '../../services/ApiService';
import AuthService from '../../services/AuthService';

// Register Component
const Register = ({ onSwitchToLogin, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
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
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);

    ApiService.register(formData)
      .then(response => {
        AuthService.setToken(response.token);
        AuthService.setUser({
          id: response._id,
          name: response.name,
          email: response.email
        });

        toast.success('Registration successful!');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us to get AI-powered feedback</p>
        </div>

        <div className="space-y-6">
          <Input
            icon={User}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            Create Account
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;