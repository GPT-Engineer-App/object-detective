import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from '../utils/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    confidenceThreshold: 0.5,
    useGPU: true,
    enableMultiThreading: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await getUserSettings();
        setSettings(userSettings);
      } catch (err) {
        setError('Failed to load settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserSettings(settings);
      alert('Settings saved successfully!');
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    }
  };

  if (isLoading) return <div>Loading settings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="confidenceThreshold" className="block mb-1">Confidence Threshold</label>
          <input
            id="confidenceThreshold"
            name="confidenceThreshold"
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={settings.confidenceThreshold}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="useGPU"
            name="useGPU"
            checked={settings.useGPU}
            onChange={handleChange}
          />
          <label htmlFor="useGPU">Use GPU Acceleration</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableMultiThreading"
            name="enableMultiThreading"
            checked={settings.enableMultiThreading}
            onChange={handleChange}
          />
          <label htmlFor="enableMultiThreading">Enable Multi-threading</label>
        </div>
        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;