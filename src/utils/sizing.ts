import {Dimensions, PixelRatio} from 'react-native';

// Design dimensions (iPhone X/11/12/13 standard)
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

/**
 * Scales a size based on the design width (375px)
 * @param size - The size in design pixels
 * @returns The scaled size for the current device
 */
export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / DESIGN_WIDTH) * size;
};

/**
 * Scales a size based on the design height (812px)
 * @param size - The size in design pixels
 * @returns The scaled size for the current device
 */
export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;
};

/**
 * Scales a size based on the smaller dimension to maintain aspect ratio
 * Useful for maintaining consistent sizing across different screen sizes
 * @param size - The size in design pixels
 * @returns The scaled size for the current device
 */
export const scaleSize = (size: number): number => {
  const scale = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, SCREEN_HEIGHT / DESIGN_HEIGHT);
  return size * scale;
};

/**
 * Scales font size based on screen width
 * @param size - The font size in design pixels
 * @returns The scaled font size for the current device
 */
export const scaleFont = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Gets the current screen dimensions
 * @returns Object with width and height
 */
export const getScreenDimensions = () => {
  return {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  };
};

/**
 * Gets the scaling factors
 * @returns Object with width and height scaling factors
 */
export const getScaleFactors = () => {
  return {
    widthScale: SCREEN_WIDTH / DESIGN_WIDTH,
    heightScale: SCREEN_HEIGHT / DESIGN_HEIGHT,
  };
};

