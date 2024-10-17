import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ErrorBoundary from './src/component/ErrorBoundary';
import UnauthenticatedStack from './src/screens/unprotected_routes/index';
import AuthenticatedStack from './src/screens/authenticated_routes/index';
import {enableScreens} from 'react-native-screens';
import {colors} from './src/common/GlobalStyles';
import {UserProvider} from './src/context/UserContext';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="UnauthenticatedStack"
            component={UnauthenticatedStack}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="AuthenticatedStack"
            component={AuthenticatedStack}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
              statusBarColor: colors.white,
              statusBarStyle: 'dark',
            }}
          />
        </Stack.Navigator>
      </UserProvider>
    </ErrorBoundary>
  );
}
