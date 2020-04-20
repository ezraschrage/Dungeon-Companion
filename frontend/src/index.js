import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { setAuthToken } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});