import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
Modal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
);
