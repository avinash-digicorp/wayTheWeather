import moment, {Moment} from 'moment';
import {navigateTo, routes} from 'navigation';
import {useEffect, useState} from 'react';
import {AddressProps} from 'screens/address-select/type';
import {DateType} from 'store/common-interface';
import {fetchLocationFromPlaceId} from 'store/common/service';
import {hasObjectLength} from 'utils';

export const useHomeContainer = (): IHomeProps => {
  const [startLocation, setStartLocation] = useState<AddressProps | null>(null);
  const [endLocation, setEndLocation] = useState<AddressProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const startLocationTitle = startLocation?.structured_formatting?.main_text;
  const endLocationTitle = endLocation?.structured_formatting?.main_text;
  useEffect(() => {
    return () => {};
  }, []);

  const enterStartLocation = () => {
    const onAddressSelect = async (address: AddressProps) => {
      setStartLocation(address);
      const location: any = await fetchLocationFromPlaceId(address.place_id);
      if (hasObjectLength(location)) {
        setStartLocation({...address, location});
      }
    };
    navigateTo(routes.ENTER_LOCATION, {
      value: startLocationTitle,
      type: 'start',
      onAddressSelect,
    });
  };
  const enterEndLocation = () => {
    const onAddressSelect = async (address: AddressProps) => {
      setEndLocation(address);
      const location: any = await fetchLocationFromPlaceId(address.place_id);
      if (hasObjectLength(location)) {
        setEndLocation({...address, location});
      }
    };
    navigateTo(routes.ENTER_LOCATION, {
      value: endLocationTitle,
      type: 'end',
      onAddressSelect,
    });
  };

  const onSubmit = () => {
    navigateTo(routes.WEATHER_TRACKING, {
      startLocation,
      endLocation,
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
    startLocationTitle,
    endLocationTitle,
  };
  const handlers = {enterStartLocation, enterEndLocation, onSubmit};
  return {...stats, ...handlers};
};

export interface IHomeProps {
  startLocation: AddressProps;
  endLocation: AddressProps;
  loading: boolean;
  date: Moment;
  time: DateType;
  setStartLocation: (location: AddressProps) => void;
  setEndLocation: (location: AddressProps) => void;
  setLoading: (loading: boolean) => void;
  setDate: (date: DateType) => void;
  setTime: (date: DateType) => void;
  enterStartLocation: () => void;
  enterEndLocation: () => void;
  onSubmit: () => void;
  startLocationTitle: string;
  endLocationTitle: string;
}
