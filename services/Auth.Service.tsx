import ApiHandler from './api-handler';
import AuthRoute from './routes/auth.routes';
import {Alert} from 'react-native';

interface LoginResponse {
  message: string;
  home_page: string;
  full_name: string;
}

export const loginUser = async (payload: {usr: string; pwd: string}) => {
  try {
    const formData = new FormData();
    formData.append('usr', payload.usr);
    formData.append('pwd', payload.pwd);

    const response = await ApiHandler.post<LoginResponse>(
      AuthRoute.login,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (e: any) {
    const message =
      e.response?.data?.message ||
      e.message ||
      'Login failed. Please try again.';
    Alert.alert('Login Error', message);
    throw e;
  }
};
