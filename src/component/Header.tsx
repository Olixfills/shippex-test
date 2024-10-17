import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, pixelSizeVertical} from '../common/GlobalStyles';
import CustomText from './CustomText';

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: any;
}) {
  return (
    <View>
      <CustomText
        text={title}
        size={32}
        weight={700}
        width={300}
        color={colors.dark_grey}
      />
      <CustomText
        text={subtitle}
        size={18}
        weight={400}
        width={300}
        color={colors.text_grey}
        style={styles.space}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    marginVertical: pixelSizeVertical(10),
  },
});
