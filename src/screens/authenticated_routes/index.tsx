import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  AvatarIcon,
  BarcodeIcon,
  ShipmentIcon,
  WalletIcon,
} from '../../../assets/icons';
import {colors, fontPixel, pixelSizeVertical} from '../../common/GlobalStyles';
import Shipments from './Shipments';
import Scan from './Scan';
import Wallet from './Wallet';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'Shipments',
    component: Shipments,
    icon: ShipmentIcon,
  },
  {
    name: 'Scan',
    component: Scan,
    icon: BarcodeIcon,
  },
  {
    name: 'Wallet',
    component: Wallet,
    icon: WalletIcon,
  },
  {
    name: 'Profile',
    component: Profile,
    icon: AvatarIcon,
  },
];

const AuthenticatedStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: pixelSizeVertical(8),
          paddingBottom: pixelSizeVertical(4),
          height: pixelSizeVertical(65),
          backgroundColor: colors.white,
        },
        tabBarActiveTintColor: colors.dark_blue,
        tabBarInactiveTintColor: colors.text_grey,
        tabBarItemStyle: {
          paddingBottom: pixelSizeVertical(4),
        },
        tabBarIconStyle: {
          paddingHorizontal: '50%',
          marginBottom: pixelSizeVertical(6),
        },
        tabBarLabelStyle: {
          fontSize: fontPixel(11),
          fontFamily: 'Jost',
        },
      }}>
      {tabScreens.map(({name, component, icon: IconComponent}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <IconComponent
                color={focused ? colors.dark_blue : colors.text_grey}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AuthenticatedStack;
