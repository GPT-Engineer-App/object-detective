import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [endpoints, setEndpoints] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: ''
  });
  const [results, setResults] = useState({
    endpoint1: '',
    endpoint2: '',
    endpoint3: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEndpoints(prev => ({ ...prev, [name]: value }));
  };

  const testEndpoint = async (endpointName) => {
    try {
      const response = await fetch(endpoints[endpointName]);
      const data = await response.json();
      setResults(prev => ({ ...prev, [endpointName]: JSON.stringify(data, null, 2) }));
    } catch (error) {
      setResults(prev => ({ ...prev, [endpointName]: `Error: ${error.message}` }));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enginelabs.ai Settings</h1>
      
      {Object.keys(endpoints).map((endpointName) => (
        <div key={endpointName} className="mb-4">
          <label className="block mb-2">
            {endpointName}:
            <Input
              type="text"
              name={endpointName}
              value={endpoints[endpointName]}
              onChange={handleInputChange}
              className="w-full"
            />
          </label>
          <Button
            onClick={() => testEndpoint(endpointName)}
            className="mt-2"
          >
            Test {endpointName}
          </Button>
          {results[endpointName] && (
            <pre className="mt-2 p-2 bg-gray-100 rounded">
              {results[endpointName]}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default Settings;