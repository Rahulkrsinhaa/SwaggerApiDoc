import React from 'react';
import './DefineTemplate.css'

const DefineTemplate = ({ title, text }) => (
  <div className="define-main">
    <div className="define-container">
      <h2 className="define-title">{title}</h2>
      <p className="define-text">{text}</p>
     </div>
  </div>
);

export default DefineTemplate;
