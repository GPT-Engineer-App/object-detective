import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1>Enginelabs.ai Settings</h1>
      <div>
        <label htmlFor="endpoint1">Endpoint 1: </label>
        <input type="text" id="endpoint1" name="endpoint1" />
        <button>Test</button>
      </div>
      <div>
        <label htmlFor="endpoint2">Endpoint 2: </label>
        <input type="text" id="endpoint2" name="endpoint2" />
        <button>Test</button>
      </div>
      <div>
        <label htmlFor="endpoint3">Endpoint 3: </label>
        <input type="text" id="endpoint3" name="endpoint3" />
        <button>Test</button>
      </div>
    </div>
  );
};

export default Settings;