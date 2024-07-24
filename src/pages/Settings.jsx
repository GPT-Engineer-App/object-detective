import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  const [endpoints, setEndpoints] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: '',
  });
  const [apiResults, setApiResults] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: '',
  });

  const handleEndpointChange = (e) => {
    const { name, value } = e.target;
    setEndpoints(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const testApiCall = async (endpoint) => {
    try {
      const response = await fetch(endpoints[endpoint]);
      const data = await response.text();
      setApiResults(prev => ({
        ...prev,
        [endpoint]: data
      }));
    } catch (error) {
      setApiResults(prev => ({
        ...prev,
        [endpoint]: `Error: ${error.message}`
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Enginelabs.ai Settings</h1>
      <div className="space-y-6">
        {['endpoint1', 'endpoint2', 'endpoint3'].map((endpoint) => (
          <Card key={endpoint}>
            <CardHeader>
              <CardTitle>{`${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} Configuration`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor={endpoint}>API Endpoint</Label>
                <Input
                  id={endpoint}
                  name={endpoint}
                  value={endpoints[endpoint]}
                  onChange={handleEndpointChange}
                  placeholder={`Enter ${endpoint} URL`}
                />
                <Button onClick={() => testApiCall(endpoint)}>Test API Call</Button>
                {apiResults[endpoint] && (
                  <div className="mt-2">
                    <Label>API Result:</Label>
                    <div className="mt-1 p-2 bg-gray-100 rounded">
                      {apiResults[endpoint]}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;