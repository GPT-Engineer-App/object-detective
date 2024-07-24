import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from '../utils/api';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Switch } from "../components/ui/switch"
import { toast } from "../components/ui/use-toast"

const Settings = () => {
  const [settings, setSettings] = useState({
    confidenceThreshold: 0.5,
    useGPU: true,
    enableMultiThreading: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await getUserSettings();
        setSettings(userSettings);
      } catch (error) {
        console.error('Error fetching user settings:', error);
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        });
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
      toast({
        title: "Success",
        description: "Settings saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
          <Input
            id="confidenceThreshold"
            name="confidenceThreshold"
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={settings.confidenceThreshold}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="useGPU"
            name="useGPU"
            checked={settings.useGPU}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, useGPU: checked }))}
          />
          <Label htmlFor="useGPU">Use GPU Acceleration</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="enableMultiThreading"
            name="enableMultiThreading"
            checked={settings.enableMultiThreading}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableMultiThreading: checked }))}
          />
          <Label htmlFor="enableMultiThreading">Enable Multi-threading</Label>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;