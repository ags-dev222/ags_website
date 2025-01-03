import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App';
import './index.css'; // Ensure you have your CSS imports

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
