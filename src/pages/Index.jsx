import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { healthCheck, getApiKey } from '../utils/api';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const checkHealth = async () => {
      try {
        const status = await healthCheck();
        setHealthStatus(status.message);
      } catch (error) {
        setHealthStatus('Error: Backend not reachable');
      }
    };

    const fetchApiKey = async () => {
      if (token) {
        try {
          const { apiKey } = await getApiKey();
          setApiKey(apiKey);
        } catch (error) {
          console.error('Failed to fetch API key:', error);
        }
      }
    };

    checkHealth();
    fetchApiKey();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setApiKey('');
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Object Detection App</h1>
      <Card className="w-full max-w-md mb-4">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Backend Health: {healthStatus}</p>
          {isLoggedIn && <p>API Key: {apiKey}</p>}
        </CardContent>
      </Card>
      <div className="space-y-4 w-full max-w-md">
        {isLoggedIn ? (
          <>
            <Link to="/live-feed">
              <Button className="w-full">Go to Live Feed</Button>
            </Link>
            <Link to="/history">
              <Button className="w-full" variant="outline">View History</Button>
            </Link>
            <Link to="/settings">
              <Button className="w-full" variant="outline">Settings</Button>
            </Link>
            <Button className="w-full" variant="destructive" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="w-full">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full" variant="outline">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;