import ApiHandler from './api-handler';
import UserRoute from './routes/user.routes';
import {Alert} from 'react-native';

interface ShipmentResponse {
  message: Message[];
}

interface Message {
  name: string;
  creation: string;
  modified: string;
  modified_by: string;
  owner: string;
  docstatus: number;
  idx: number;
  status: string;
  color: string;
  _user_tags: null;
  _comments: null;
  _assign: null;
  _liked_by: null;
}

export const GetShipment = async () => {
  try {
    const params = {
      doctype: 'AWB Status',
      fields: JSON.stringify(['*']),
    };

    const response = await ApiHandler.get<ShipmentResponse>(
      UserRoute.shipment,
      {
        params,
      },
    );

    return response.data;
  } catch (e: any) {
    const message =
      e.response?.data?.message ||
      e.message ||
      'Failed to fetch shipment status.';
    Alert.alert('Fetch Error', message);
    throw e;
  }
};
