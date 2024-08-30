import {useState} from 'react';

export const useWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const values = {loading};
  const handlers = {setLoading};

  return {...values, ...handlers};
};
