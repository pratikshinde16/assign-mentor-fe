import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Import the styles.css file

// Replace ReactDOM.render with ReactDOM.createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
