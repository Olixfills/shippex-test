import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../common/GlobalStyles'; // Import colors if needed

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  size?: number;
  color?: string;
  style?: ViewStyle; // Optional style prop
  textStyle?: TextStyle; // Optional text style prop
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  size = 24,
  color = colors.dark_blue,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={styles.checkboxContainer}>
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
        {checked && <View style={styles.checkedMark} />}
      </View>
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
    borderRadius: 4, // Can change to round with higher values
    padding: 2,
  },
  checkedMark: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.dark_blue,
  },
  label: {
    marginLeft: 10, // Space between checkbox and label
  },
});
