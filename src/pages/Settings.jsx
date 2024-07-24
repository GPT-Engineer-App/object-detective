import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  const [endpoints, setEndpoints] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: '',
  });
  const [apiResults, setApiResults] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEndpoints(prev => ({ ...prev, [name]: value }));
  };

  const testApiCall = async (endpointKey) => {
    try {
      const response = await fetch(endpoints[endpointKey]);
      const data = await response.json();
      setApiResults(prev => ({ ...prev, [endpointKey]: JSON.stringify(data, null, 2) }));
    } catch (error) {
      setApiResults(prev => ({ ...prev, [endpointKey]: `Error: ${error.message}` }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Enginelabs.ai Settings</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>API Endpoints Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(endpoints).map((key) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <Input
                type="text"
                id={key}
                name={key}
                value={endpoints[key]}
                onChange={handleInputChange}
                placeholder={`Enter ${key} URL`}
              />
              <Button onClick={() => testApiCall(key)} className="mt-2">
                Test {key}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Call Results</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(apiResults).map(([key, value]) => (
            <div key={key} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{key} Result:</h3>
              <pre className="bg-gray-100 p-2 rounded">{value}</pre>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;