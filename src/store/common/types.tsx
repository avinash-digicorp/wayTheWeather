import {LocationTypes, WeatherProp} from 'store/common-interface';

export interface IInitialCommonStateProps {
  location: null | LocationTypes;
  weather: null | WeatherProp;
  unit: 'metric' | 'imperial';
  fetchingWeather: boolean;
}
