import {useRoute} from '@react-navigation/native';
import {debounce} from 'lodash';
import {goBack} from 'navigation';
import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {searchLocation} from 'store/common/service';
import {hasTextLength} from 'utils';
import {AddressProps} from './type';

export const useAddressSelectContainer = () => {
  const ref = useRef<TextInput>(null);
  const [textValue, setTextValue] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const route = useRoute();
  const value = route.params?.value;
  const onAddressSelect = route.params?.onAddressSelect;
  useEffect(() => {
    onChangeText(value);
  }, [value]);

  const setInitialData = async (data: []) => {
    setAddressList(data);
    setFetching(false);
  };
  const searchAddress = async (input: string) => {
    if (!hasTextLength(input)) {
      setInitialData([]);
      return;
    }
    setFetching(true);
    const data = await searchLocation(input as string);
    if (data) setInitialData(data);
  };
  const onChangeText = (text: string) => {
    setTextValue(text);
    searchAddress(text);
  };
  const clearText = () => {
    setTextValue('');
    setAddressList([]);
    ref.current?.clear();
  };
  const onSelectAddress = (address: AddressProps) => {
    const addressTitle = address?.structured_formatting?.main_text;
    setTextValue(addressTitle);
    ref?.current?.setNativeProps({text: addressTitle});
    goBack();
    onAddressSelect?.(address);
  };
  const delayedQuery = debounce((q: string) => onChangeText(q), 500);

  const stats = {
    value,
    addressList,
    fetching,
    textValue,
    setTextValue,
  };
  const handlers = {
    ref,
    onChangeText,
    clearText,
    delayedQuery,
    onSelectAddress,
  };
  return {...stats, ...handlers};
};

export interface AddressSelectProps {}
