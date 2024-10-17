import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const WithAauthenticatedWrapper = (Component: any, noSafeArea?: boolean) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flex: 1,
      paddingHorizontal: pixelSizeHorizontal(noSafeArea ? 0 : 16),
      paddingVertical: pixelSizeVertical(noSafeArea ? 0 : 10),
    },
  });
  return (props: any) => {
    return (
      <>
        {noSafeArea ? (
          <View style={styles.container}>
            <Component {...props} />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <Component {...props} />
          </SafeAreaView>
        )}
      </>
    );
  };
};

export default WithAauthenticatedWrapper;
