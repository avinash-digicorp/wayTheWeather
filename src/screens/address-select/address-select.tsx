import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from 'components';
import {fonts} from 'utils/fonts';
import {useAddressSelectContainer} from './address-select-container';
import {ScrollView} from 'moti';
import AddressList from './partials/address-list';
import SearchAddress from './partials/search-address';

export default () => {
  const props = useAddressSelectContainer();
  return (
    <View style={styles.container}>
      <Header title="header.home" />
      <SearchAddress {...props} />
      <ScrollView className="pb-4" keyboardDismissMode="on-drag">
        <AddressList {...props} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  input: {
    marginBottom: 5,
    fontFamily: fonts.medium,
  },
});
