/* eslint-disable no-param-reassign */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Request interceptor for API calls
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  config.withCredentials = true;
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => Promise.reject(error));

// Response interceptor for API calls
axios.interceptors.response.use((response) => response, (error) => new Promise((resolve) => {
  const originalRequest = error.config;
  // eslint-disable-next-line no-underscore-dangle, max-len
  if (error.response.status === 403 && error.response.data.message.message === 'Token authentication failed.' && !originalRequest._retry) {
    // eslint-disable-next-line no-underscore-dangle
    originalRequest._retry = true;
    const body = {
      email: localStorage.getItem('userEmail'),
      employeeId: localStorage.getItem('userEmpId'),
    };
    const response = axios
      .post(`${process.env.REACT_APP_BASE_URL}/promTool/refreshToken`, body)
      .then((res) => {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        return axios(originalRequest);
      })
      .catch((err) => {
        throw err;
      });
    resolve(response);
  }
  throw error;
}));

ReactDOM.render(
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
