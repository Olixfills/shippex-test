import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Login from './Login';
import {useNavigation} from '@react-navigation/native';

const UnauthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
export default UnauthenticatedStack;
