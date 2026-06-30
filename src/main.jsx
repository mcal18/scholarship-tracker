import React from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { ScholarshipProvider } from './context/scholarshipContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScholarshipProvider>
          <App />
        </ScholarshipProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
