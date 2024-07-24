import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1>Enginelabs.ai Settings</h1>
      <div>
        <h2>Endpoint 1 Configuration</h2>
        <label htmlFor="endpoint1">API Endpoint 1</label>
        <input id="endpoint1" name="endpoint1" type="text" placeholder="Enter endpoint 1 URL" />
        <button>Test API Call</button>
      </div>
      <div>
        <h2>Endpoint 2 Configuration</h2>
        <label htmlFor="endpoint2">API Endpoint 2</label>
        <input id="endpoint2" name="endpoint2" type="text" placeholder="Enter endpoint 2 URL" />
        <button>Test API Call</button>
      </div>
      <div>
        <h2>Endpoint 3 Configuration</h2>
        <label htmlFor="endpoint3">API Endpoint 3</label>
        <input id="endpoint3" name="endpoint3" type="text" placeholder="Enter endpoint 3 URL" />
        <button>Test API Call</button>
      </div>
    </div>
  );
};

export default Settings;