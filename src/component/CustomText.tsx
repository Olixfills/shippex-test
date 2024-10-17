import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fontPixel} from '../common/GlobalStyles';

type Props = {
  color?: string;
  size?: number;
  text: string | number;
  weight?: any;
  style?: any;
  width?: any;
  numberOfLines?: number;
};

const CustomText = ({
  color,
  size,
  text,
  style,
  weight,
  numberOfLines,
}: Props) => {
  const dynamicStyles = StyleSheet.create({
    txt: {
      color: color,
      fontSize: fontPixel(size || 14),
      fontWeight: weight || 'normal',
      fontFamily: 'Jost',
    },
  });

  const combinedStyles = [dynamicStyles.txt, style];

  return (
    <Text numberOfLines={numberOfLines || null} style={combinedStyles}>
      {text}
    </Text>
  );
};

export default CustomText;
