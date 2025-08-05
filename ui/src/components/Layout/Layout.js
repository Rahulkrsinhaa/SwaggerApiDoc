import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-title">Configuration Management</div>
        </div>
      </div>
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
