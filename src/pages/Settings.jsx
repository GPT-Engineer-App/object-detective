import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    confidenceThreshold: 0.5,
    useGPU: true,
    enableMultiThreading: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implement actual saving logic
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <div>
          <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-gray-700">
            Confidence Threshold
          </label>
          <input
            type="number"
            id="confidenceThreshold"
            name="confidenceThreshold"
            min="0"
            max="1"
            step="0.1"
            value={settings.confidenceThreshold}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useGPU"
            name="useGPU"
            checked={settings.useGPU}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="useGPU" className="ml-2 block text-sm text-gray-900">
            Use GPU Acceleration
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableMultiThreading"
            name="enableMultiThreading"
            checked={settings.enableMultiThreading}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableMultiThreading" className="ml-2 block text-sm text-gray-900">
            Enable Multi-threading
          </label>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;