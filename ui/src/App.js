import React from 'react';
import ConfigurationManagement from './components/Configuration/ConfigurationManagement';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/*" element={<ConfigurationManagement />} />
        </Routes>
      </div> 
    </>
  );
}

export default App;