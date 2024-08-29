import moment, {Moment} from 'moment';
import {navigateTo, routes} from 'navigation';
import {useEffect, useState} from 'react';
import {DateType, LocationTypes} from 'store/common-interface';

export const useHomeContainer = (): IHomeProps => {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  useEffect(() => {
    return () => {};
  }, []);

  const enterStartLocation = () => {
    navigateTo(routes.ENTER_LOCATION, {
      value: startLocation,
      setValue: setStartLocation,
      type: 'start',
    });
  };
  const enterEndLocation = () => {
    navigateTo(routes.ENTER_LOCATION, {
      value: endLocation,
      setValue: setEndLocation,
      type: 'end',
    });
  };
  const stats = {
    startLocation,
    endLocation,
    loading,
    date,
    time,
    setStartLocation,
    setEndLocation,
    setLoading,
    setDate,
    setTime,
  };
  const handlers = {enterStartLocation, enterEndLocation};
  return {...stats, ...handlers};
};

export interface IHomeProps {
  startLocation: LocationTypes;
  endLocation: LocationTypes;
  loading: boolean;
  date: Moment;
  time: DateType;
  setStartLocation: (location: LocationTypes) => void;
  setEndLocation: (location: LocationTypes) => void;
  setLoading: (loading: boolean) => void;
  setDate: (date: DateType) => void;
  setTime: (date: DateType) => void;
  enterStartLocation: () => void;
  enterEndLocation: () => void;
}
