import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.71154 12H17.7885M4.25 7H20.25M10.4038 17H14.0962"
      stroke="#58536E"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
export default SvgComponent;
