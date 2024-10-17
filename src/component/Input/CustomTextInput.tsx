import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ErrorIcon} from '../../../assets/icons/index';
import {
  colors,
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  height?: number;
  keyboardType?: any;
  error?: boolean;
  errormsg?: string;
  label?: string;
  editable?: any;
  isPassword?: boolean;
};

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  height,
  keyboardType,
  error,
  errormsg,
  label,
  editable,
  isPassword,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    input: {
      width: '100%',
      borderColor: isFocused
        ? colors.dark_blue
        : error
        ? colors.error_red // Border color when there's an error
        : 'transparent', // No border when not focused and no error
      borderWidth: isFocused || error ? 1 : 0, // Show border only when focused or error
      height: heightPixel(height || 77),
      paddingHorizontal: pixelSizeHorizontal(10),
      color: colors.dark_grey,
      fontFamily: 'Jost',
      fontSize: fontPixel(16),
      borderRadius: 12,
      backgroundColor: colors.very_light_grey,
    },
    label: {
      position: 'absolute',
      left: pixelSizeHorizontal(10),
      top: isFocused || value ? pixelSizeVertical(-10) : pixelSizeVertical(10), // Move label up when focused or when there's value
      backgroundColor: colors.very_light_grey, // Match with input background
      paddingHorizontal: pixelSizeHorizontal(5), // Add some padding to prevent overlap with input
      fontSize: fontPixel(14),
      color: isFocused || error ? colors.dark_blue : colors.dark_grey, // Change color based on focus/error
      transition: 'all 0.3s ease', // Smooth transition (Note: not supported in React Native)
    },
    errortext: {
      color: colors.error_red,
      fontFamily: 'Jost',
      fontSize: fontPixel(12),
    },
    errbox: {
      marginTop: pixelSizeVertical(7),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      marginBottom: pixelSizeVertical(20), // Add spacing between inputs
      position: 'relative', // Needed for absolutely positioned label
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={val => setValue(val)}
        defaultValue={value}
        placeholderTextColor={colors.lumii_light_grey}
        returnKeyType="done"
        keyboardType={keyboardType || 'default'}
        editable={editable}
        secureTextEntry={isPassword || false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <View style={styles.errbox}>
          <ErrorIcon />
          <Text style={styles.errortext}>{errormsg}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomTextInput;
