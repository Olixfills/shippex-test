import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Set the base dimensions that are commonly used for design (iPhone 11 Pro)
const BASE_WIDTH = 375; // Typical width for design (iPhone 11)
const BASE_HEIGHT = 812; // Typical height for design (iPhone 11)

const widthBaseScale = SCREEN_WIDTH / BASE_WIDTH;
const heightBaseScale = SCREEN_HEIGHT / BASE_HEIGHT;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// For width scaling
const widthPixel = (size: number) => normalize(size, 'width');

// For height scaling
const heightPixel = (size: number) => normalize(size, 'height');

// For font scaling, usually based on height
const fontPixel = (size: number) => heightPixel(size);

// For vertical margin and padding
const pixelSizeVertical = (size: number) => heightPixel(size);

// For horizontal margin and padding
const pixelSizeHorizontal = (size: number) => widthPixel(size);

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};

export const colors = {
  white: '#ffffff',
  dark_blue: '#2F50C1',
  semi_dark_blue: '#4169E1',
  semi_very_light_blue: '#6E91EC',
  semi_very_light_grey: '#EAE7F2',
  semi_very_light_green: '#25D366',
  light_grey: '#F4F2F8',
  very_light_grey: '#EBEBEB',
  dark_grey: '#323232',
  text_grey: '#A7A3B3',
  error_red: '#FF0004',
  semi_dark_grey: '#505050',
};
