import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AuthService from './services/AuthService';

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const renderCurrentView = () => {
    if (isAuthenticated && currentView === 'dashboard') {
      return <Dashboard onLogout={handleLogout} />;
    }

    switch (currentView) {
      case 'register':
        return (
          <Register
            onSwitchToLogin={() => setCurrentView('login')}
            onSuccess={handleAuthSuccess}
          />
        );
      case 'login':
      default:
        return (
          <Login
            onSwitchToRegister={() => setCurrentView('register')}
            onSuccess={handleAuthSuccess}
          />
        );
    }
  };

  return (
    <div className="App">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {renderCurrentView()}
    </div>
  );
};

export default App;