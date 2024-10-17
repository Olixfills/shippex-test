import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../common/GlobalStyles';
import {LogoBottom, LogoTop} from '../../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const AnimatedOnboarding = () => {
  const logoContainerRef = useRef(null);
  const topLogoRef = useRef(null);
  const bottomLogoRef = useRef(null);
  const blueBgRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    logoContainerRef.current
      ?.animate(
        {
          0: {width: 36, height: 36, opacity: 1, scale: 0.1},
          1: {width: 144, height: 144, opacity: 1, scale: 1},
        },
        3000,
      )
      .then(() => {
        topLogoRef.current?.animate(
          {
            0: {translateY: 0, opacity: 1, scale: 1},
            1: {translateY: -300, opacity: 1, scale: 5},
          },
          1200,
        );

        bottomLogoRef.current?.animate(
          {
            0: {translateY: 0, translateX: 0, opacity: 1, scale: 1},
            1: {translateY: -300, translateX: -100, opacity: 1, scale: 1.5},
          },
          1500,
        );

        return blueBgRef.current?.fadeIn(2000);
      })
      .then(() => {
        navigation.navigate('Onboarding');
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Blue background that fades in */}
      <Animatable.View
        ref={blueBgRef}
        style={styles.blueBg}
        animation="fadeOut"
        duration={0}
      />

      {/* Logo container with scaling animation */}
      <Animatable.View ref={logoContainerRef} style={styles.logoContainer}>
        {/* Top Logo */}
        <Animatable.View ref={topLogoRef}>
          <LogoTop />
        </Animatable.View>

        {/* Bottom Logo */}
        <Animatable.View ref={bottomLogoRef}>
          <LogoBottom />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default AnimatedOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  blueBg: {
    ...StyleSheet.absoluteFillObject, // Cover the whole screen
    backgroundColor: colors.dark_blue,
    opacity: 0, // Initially hidden, will fade in
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
});
