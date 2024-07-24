import React, { useState } from 'react';

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
      const data = await response.text();
      setResults(prev => ({ ...prev, [endpointName]: data }));
    } catch (error) {
      setResults(prev => ({ ...prev, [endpointName]: `Error: ${error.message}` }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Enginelabs.ai Settings</h1>
      {Object.keys(endpoints).map((endpointName) => (
        <div key={endpointName} style={{ marginBottom: '20px' }}>
          <label htmlFor={endpointName}>{`${endpointName}: `}</label>
          <input
            type="text"
            id={endpointName}
            name={endpointName}
            value={endpoints[endpointName]}
            onChange={handleInputChange}
            style={{ marginRight: '10px' }}
          />
          <button onClick={() => testEndpoint(endpointName)}>Test</button>
          <div>Result: {results[endpointName]}</div>
        </div>
      ))}
    </div>
  );
};

export default Settings;