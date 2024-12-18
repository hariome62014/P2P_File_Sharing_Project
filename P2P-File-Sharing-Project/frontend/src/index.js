import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
