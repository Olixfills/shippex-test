import React, {useState} from 'react';
import {StyleSheet, View, Alert, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  colors,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';
import BackButton from '../../component/BackButton';
import CustomButton from '../../component/CustomButton';
import Header from '../../component/Header';
import CustomTextInput from '../../component/Input/CustomTextInput';
import {loginUser} from '../../../services/Auth.Service';

type Props = {
  navigation: any;
};

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Keyboard.dismiss();

    setLoading(true);
    const payload = {
      usr: email,
      pwd: password,
    };

    try {
      const apiResponse = await loginUser(payload);
      setLoading(false);

      if (apiResponse?.message === 'Logged In') {
        navigation.navigate('AuthenticatedStack');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or server issue.');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Login Error', 'Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <BackButton />

        <View style={styles.headerbox}>
          <Header
            title="Login"
            subtitle="Please enter your Username, Password, and URL to proceed."
          />
        </View>

        <View style={styles.input}>
          <CustomTextInput value={url} setValue={setUrl} placeholder="URL" />
          <CustomTextInput
            value={email}
            setValue={setEmail}
            placeholder="Username / User"
          />
          <CustomTextInput
            value={password}
            setValue={setPassword}
            isPassword
            placeholder="Password"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            onPress={handleLoginUser}
            bgColor={colors.dark_blue}
            text="Login"
            loading={loading}
            // inactive={loading || !(email && password && url.length > 3)}
            inactive={loading || !(email && password)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lumii_off_white,
  },
  container1: {
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(20),
    marginTop: pixelSizeVertical(20),
  },
  headerbox: {
    marginTop: pixelSizeVertical(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: pixelSizeVertical(30),
    flexGrow: 1,
  },
  buttonWrapper: {
    paddingBottom: pixelSizeVertical(20),
    justifyContent: 'flex-end',
  },
});
