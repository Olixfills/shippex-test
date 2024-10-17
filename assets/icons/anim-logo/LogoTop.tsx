import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={props.width || 146}
    height={props.height || 48}
    // width={'100%'}
    // height={'100%'}
    viewBox="0 0 146 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M145.231 0C145.231 13.2441 139.854 25.2413 131.161 33.9359C122.665 42.4283 110.97 47.7865 98.0422 47.9887H0.775635L48.9936 0H145.231Z"
      fill="#2F50C1"
    />
  </Svg>
);
export default SvgComponent;
