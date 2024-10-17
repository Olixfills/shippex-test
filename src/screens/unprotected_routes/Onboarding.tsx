import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';
import {WhiteLogo} from '../../../assets/icons';
import CustomButton from '../../component/CustomButton';

const Onboarding = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <WhiteLogo />

      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={handleGetStarted}
          bgColor={colors.white}
          text="Login"
          color={colors.dark_blue}
          fontWeight="700"
          fontSize={17}
          height={pixelSizeVertical(56)}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark_blue,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: pixelSizeVertical(32),
    left: 0,
    right: 0,
    paddingHorizontal: pixelSizeHorizontal(24),
  },
});
