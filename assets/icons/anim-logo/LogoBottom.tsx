import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={props.width || 144}
    height={props.height || 92}
    // width={'100%'}
    // height={'100%'}
    viewBox="0 0 144 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M143.374 43.6406L94.7835 92H0.949296V91.899L0.920654 91.8821V91.7137C0.920654 90.0455 1.29304 78.3852 8.29926 67.1969C11.8731 61.5016 17.0781 55.9242 24.915 51.6106C32.0931 47.6677 47.2295 43.9944 59.6917 44.0618L59.321 59.985L78.1374 42.0062L60.1501 23.1847L60.0928 25.7628L59.7777 39.2932C55.8516 39.1584 49.8092 39.2258 42.9327 40.5738L3.03701 0.824707H100.361L143.374 43.6406Z"
      fill="#2F50C1"
    />
  </Svg>
);
export default SvgComponent;
