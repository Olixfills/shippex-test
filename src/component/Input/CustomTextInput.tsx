import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, TextInputProps} from 'react-native';
import {ErrorIcon} from '../../../assets/icons/index';
import {
  colors,
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '../../common/GlobalStyles';

type Props = TextInputProps & {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  height?: number;
  error?: boolean;
  errormsg?: string;
  label?: string;
  editable?: boolean;
  isPassword?: boolean;
  icon?: React.ReactNode;
};

const CustomTextInput = ({
  value,
  setValue,
  placeholder,
  height,
  keyboardType,
  error,
  errormsg,
  editable = true,
  isPassword = false,
  icon,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.light_grey,
      borderRadius: 12,
      borderColor: isFocused
        ? colors.dark_blue
        : error
        ? colors.error_red
        : 'transparent',
      borderWidth: isFocused || error ? 1 : 0,
      height: heightPixel(height || 77),
      paddingHorizontal: pixelSizeHorizontal(10),
    },
    input: {
      flex: 1,
      color: colors.dark_grey,
      fontFamily: 'Jost',
      fontSize: fontPixel(16),
    },
    label: {
      position: 'absolute',
      left: pixelSizeHorizontal(10),
      top: isFocused || value ? pixelSizeVertical(-10) : pixelSizeVertical(10),
      backgroundColor: colors.light_grey,
      paddingHorizontal: pixelSizeHorizontal(5),
      fontSize: fontPixel(14),
      color: isFocused || error ? colors.dark_blue : colors.dark_grey,
    },
    errortext: {
      color: colors.error_red,
      fontFamily: 'Jost',
      fontSize: fontPixel(12),
    },
    errbox: {
      marginTop: pixelSizeVertical(7),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      marginBottom: pixelSizeVertical(20),
      position: 'relative',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && (
          <View style={{marginRight: pixelSizeHorizontal(10)}}>{icon}</View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={setValue}
          value={value}
          placeholderTextColor={colors.text_grey}
          keyboardType={keyboardType || 'default'}
          editable={editable}
          secureTextEntry={isPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>
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
