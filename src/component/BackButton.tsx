import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronIcon} from '../../assets/icons';
import {colors} from '../common/GlobalStyles';
import CustomText from './CustomText';

type Props = {
  route?: string;
  color?: string;
};

const BackButton = ({route, color}: Props) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (route) {
      navigation.navigate(route);
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <ChevronIcon />
      <CustomText
        text="Cancel"
        size={20}
        weight={400}
        color={colors.dark_blue}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
