import React, {Fragment} from 'react';
import {isEmpty} from 'utils/condition';
import {AssetSvg, ButtonView, Text} from '@/components';
import {View} from 'moti';
import Animated, {BounceInDown} from 'react-native-reanimated';
import {AddressProps} from '../type.d';

interface IAddressListProps {
  addressList: AddressProps[];
  onSelectAddress: (address: AddressProps) => void;
}

export default (props: IAddressListProps) => {
  const {addressList, onSelectAddress} = props;
  if (isEmpty(addressList)) return null;

  return addressList.map((address: AddressProps, index: number) => {
    const {structured_formatting, place_id} = address;
    const title = structured_formatting?.main_text;
    const subTitle = structured_formatting?.secondary_text;
    const isLast = addressList.length === index + 1;
    return (
      <Fragment key={place_id}>
        <Animated.View entering={BounceInDown.delay(index * 100)}>
          <ButtonView
            className="bg-white w-full"
            button="highlight"
            onPress={() => onSelectAddress(address)}>
            <View className="px-3 py-2 w-full flex-row items-center">
              <AssetSvg name={'location_2'} width={22} height={22} />
              <View className="ml-2 w-11/12">
                <Text className="letter-spacing-0.2 text-sm text-gray-900">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Text>
                <Text className="mt-1 letter-spacing-0.2 text-xs text-gray-600">
                  {subTitle}
                </Text>
              </View>

              <AssetSvg name={'right_arrow'} width={10} height={10} />
            </View>
          </ButtonView>
          {!isLast && <View className="w-full border-t border-gray-100" />}
        </Animated.View>
      </Fragment>
    );
  });
};
