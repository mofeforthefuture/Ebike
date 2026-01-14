import { Dimensions } from 'react-native';
import { scaleHeight } from '../../utils';
import { COLORS } from '../../themes';

export const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT - scaleHeight(104);
export const BOTTOM_SHEET_MIN_HEIGHT = scaleHeight(126);

export const START_COORDS = {
  latitude: 6.5244,
  longitude: 3.3792,
};

export const END_COORDS = {
  latitude: 6.526,
  longitude: 3.381,
};

// Route coordinates that follow the road path
export const routeCoordinates = [
  START_COORDS,
  { latitude: 6.5246, longitude: 3.3794 }, // First turn
  { latitude: 6.5248, longitude: 3.3796 }, // Continue along road
  { latitude: 6.525, longitude: 3.3798 }, // Mid-point curve
  { latitude: 6.5252, longitude: 3.38 }, // Approach destination
  { latitude: 6.5254, longitude: 3.3802 }, // Final approach
  { latitude: 6.5256, longitude: 3.3804 }, // Near destination
  { latitude: 6.5258, longitude: 3.3806 }, // Almost there
  END_COORDS,
];

export const trackingIcons = {
  package: require('../../assets/package.png'),
  truck: require('../../assets/truck.png'),
  mailbox: require('../../assets/mailBox.png'),
} as const;

export const getIconByType = (type: string) => {
  switch (type) {
    case 'truck':
      return trackingIcons.truck;
    case 'mailbox':
      return trackingIcons.mailbox;
    case 'package':
    default:
      return trackingIcons.package;
  }
};
