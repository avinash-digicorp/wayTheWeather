import lineLoading from './line-loading.json';
import locationPin from './location-pin.json';
import locationPin2 from './location-pin-2.json';
import lineBackground from './line-bg.json';
import home from './home-lottie.json';
import settings from './setting-lottie.json';
import weather from './weather-lottie.json';
import crown from './crown-lottie.json';
import rightArrow from './right-arrow-lottie.json';

export const ANIMATED_ICONS = {
  lineLoading,
  locationPin2,
  lineBackground,
  locationPin,
  home,
  settings,
  weather,
  crown,
  rightArrow,
};

export type AnimatedIconType = keyof typeof ANIMATED_ICONS;
