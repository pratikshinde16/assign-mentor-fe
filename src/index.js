import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles.css'; // Import the styles.css file

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
