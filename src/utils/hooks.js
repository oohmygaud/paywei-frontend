/*
import { buildAPIHooks } from 'react-hooks-http';

export const baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:9000/' : 'https://api.paywei.io/'

export const getHooks = () => {
  const token = localStorage.getItem('authToken');
  const headers = token ? { 'Authorization': "Bearer " + token } : null
  return buildAPIHooks(baseURL, {headers})
}

*/