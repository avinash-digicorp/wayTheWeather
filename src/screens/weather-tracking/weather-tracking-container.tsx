import {useRoute} from '@react-navigation/native';
import {useState} from 'react';

const START = {
  description: 'Shihor, Gujarat, India',
  location: {
    latitude: 21.7197378,
    latitudeDelta: 0.0043,
    longitude: 71.9597023,
    longitudeDelta: 0.0034,
  },
  matched_substrings: [{length: 4, offset: 0}],
  place_id: 'ChIJPfCHVaFUXzkR5aptu13c9Qk',
  reference: 'ChIJPfCHVaFUXzkR5aptu13c9Qk',
  structured_formatting: {
    main_text: 'Shihor',
    secondary_text: 'Gujarat, India',
  },
};

const END = {
  description: 'Vartej, Gujarat, India',
  location: {
    latitude: 21.7405737,
    latitudeDelta: 0.0043,
    longitude: 72.0631118,
    longitudeDelta: 0.0034,
  },
  structured_formatting: {
    main_text: 'Vartej',
    secondary_text: 'Gujarat, India',
  },
};

export const useWeatherTracking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  // const {startLocation , endLocation } = route?.params;
  const startLocation = START;
  const endLocation = END;
  const onSubmit = (): void => {
    setLoading(true);
    setLoading(false);
  };

  const values = {loading, startLocation, endLocation};
  const handlers = {setLoading, onSubmit};

  return {...values, ...handlers};
};
