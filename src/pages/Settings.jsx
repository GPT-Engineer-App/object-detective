import React, { useState } from 'react';

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
    <div>
      <h1>Enginelabs.ai Settings</h1>
      {['endpoint1', 'endpoint2', 'endpoint3'].map((endpoint) => (
        <div key={endpoint}>
          <h2>{endpoint} Configuration</h2>
          <div>
            <label htmlFor={endpoint}>API Endpoint</label>
            <input
              id={endpoint}
              name={endpoint}
              value={endpoints[endpoint]}
              onChange={handleEndpointChange}
              placeholder={`Enter ${endpoint} URL`}
            />
            <button onClick={() => testApiCall(endpoint)}>Test API Call</button>
            {apiResults[endpoint] && (
              <div>
                <p>API Result:</p>
                <div>{apiResults[endpoint]}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings;