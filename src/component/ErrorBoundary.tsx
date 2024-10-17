import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../common/GlobalStyles';
import RNRestart from 'react-native-restart';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

export class ErrorBoundary extends React.Component<any, any> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
  }

  handleRestartApp = () => {
    RNRestart.restart();
  };

  render() {
    if (this.state.error) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container2}>
            <CustomText
              text="An error occurred"
              size={26}
              weight={700}
              width={350}
              color={colors.lumii_dark_black}
            />
            <CustomText
              text="encountered an issue and unable to proceed. We regret any inconvenience this may have caused."
              size={16}
              weight={400}
              width={350}
              color={colors.lumii_dark_black}
              style={styles.text}
            />
            <CustomButton
              text="Go back!"
              bgColor={colors.lumii_dark_black}
              color={colors.lumii_white}
              width="100%"
              fontSize={16}
              fontWeight="400"
              onPress={this.handleRestartApp}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return this.props.children;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.lumii_very_light_green,
    paddingTop: '50%',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: pixelSizeHorizontal(20),
    backgroundColor: colors.lumii_white,
  },
  text: {
    marginVertical: pixelSizeVertical(20),
  },
});

export default ErrorBoundary;
