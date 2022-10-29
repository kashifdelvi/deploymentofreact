import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from 'axios';

axios.interceptors.request.use(
    (req) => {
       // Add configurations here
       return {
        ...req,
        'header':sessionStorage.getItem('token')
       };
       // every time you take a request please also send token
    },
    (err) => {
       return Promise.reject(err);
    }
);
 
 // For POST requests
axios.interceptors.response.use(
    (res) => {
       // Add configurations here
       if (res.status === 201) {
          console.log('Posted Successfully');
       }

       return res;
    },
    (err) => {
       return Promise.reject(err);
    }
);

const root = ReactDOM.createRoot(document.getElementById('zomato'));
root.render(
      
        <BrowserRouter>
            <App/>
        </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();