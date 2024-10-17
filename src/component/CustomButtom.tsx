import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors, fontPixel} from '../common/GlobalStyles'; // Import colors, fontPixel utility, etc.
import CustomText from './CustomText';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  size?: number;
  color?: string;
  label?: string;
  style?: ViewStyle; // Optional container style
  textStyle?: TextStyle; // Optional label text style
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  size = 24,
  color = colors.dark_blue,
  label,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={[styles.checkboxContainer, style]}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{checked}}
      accessibilityLabel={label}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: checked ? color : colors.light_grey,
            backgroundColor: checked ? color : colors.white,
          },
        ]}>
        {checked && (
          <View style={[styles.checkedMark, {backgroundColor: color}]} />
        )}
      </View>
      {label && (
        <CustomText
          text={'Mark all'}
          size={18}
          weight={500}
          color={colors.dark_blue}
          style={[styles.label, textStyle]}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    padding: 2,
  },
  checkedMark: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  label: {
    marginLeft: 4,
    // fontSize: fontPixel(14),
    // color: colors.dark_grey,
  },
});
