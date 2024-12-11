import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CounterContextProvider } from './counterContext'

//Passing store from here with plain redux without react-redux and @reduxjs/toolkit seems to be difficult, use App instead
/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <CounterContextProvider><App /></CounterContextProvider>)
}

renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
