import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors, fontPixel, pixelSizeHorizontal} from '../common/GlobalStyles';

type Props = {
  color?: string;
  size?: number;
  text: string;
  weight?: any;
  style?: any;
  width?: any;
  height?: number;
  bgColor: string;
  fontSize?: number;
  fontWeight?: string;
  inactive?: boolean;
  borderWidth?: number;
  borderColor?: string;
  onPress: () => void;
  icon?: JSX.Element;
  gap?: number;
  loading?: boolean;
};

const CustomButton = ({
  text,
  height,
  width,
  bgColor,
  fontSize,
  color,
  fontWeight,
  onPress,
  inactive,
  borderWidth,
  borderColor,
  icon,
  gap,
  loading,
}: Props) => {
  const styles = StyleSheet.create({
    container: {
      height: height || 50,
      backgroundColor: bgColor,
      borderRadius: 12,
      width: width || '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: pixelSizeHorizontal(20),
      borderWidth: borderWidth ? borderWidth : null,
      borderColor: borderColor ? borderColor : null,
      opacity: inactive ? 0.5 : 1,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: gap || 8,
    },
    txt: {
      fontSize: fontSize || fontPixel(16),
      color: color || colors.white,
      fontFamily: 'Jost',
      fontWeight: fontWeight || '400',
    },
  });

  return (
    <TouchableOpacity
      onPress={inactive || loading ? null : onPress}
      style={styles.container}
      disabled={inactive || loading}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={color || colors.white} />
        ) : (
          <>
            {icon && (typeof icon === 'string' ? <Text>{icon}</Text> : icon)}
            <Text style={styles.txt}>{text}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
