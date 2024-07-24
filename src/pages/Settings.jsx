import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>Detection Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;