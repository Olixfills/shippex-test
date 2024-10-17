import axios from 'axios';
import {BASE_URL} from '@env';
import {Alert} from 'react-native';

const ApiHandler = axios.create({
  baseURL: BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiHandler.interceptors.request.use(
  async config => {
    console.log('Request URL:', config.baseURL + config.url);
    console.log('Request Payload:', config.data || config.params);

    return config;
  },
  error => {
    Alert.alert('Error', 'Failed to send the request.');
    console.log('Request Error:', error);
    return Promise.reject(error);
  },
);

ApiHandler.interceptors.response.use(
  response => {
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    return response;
  },

  error => {
    const message =
      error.response?.data?.message || error.message || 'An error occurred.';
    Alert.alert('Request Failed', message);

    console.log('Response Error:', error);
    if (error.response) {
      console.log('Error Response Data:', error.response.data);
    }

    return Promise.reject(error);
  },
);

export default ApiHandler;
