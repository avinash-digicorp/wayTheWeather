import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {AssetSvg, ButtonView} from 'components';
import colors from 'theme';
import {hasTextLength} from 'utils';
import {fonts} from 'utils/fonts';

interface SearchAddressProps {
  ref: any;
  textValue: string;
  delayedQuery: (text: string) => void;
  clearText: () => void;
}

export default (props: SearchAddressProps) => {
  const {ref, textValue, delayedQuery, clearText} = props;

  return (
    <View className="flex-row justify-between border border-gray-200 rounded-md h-12 px-3 items-center">
      <AssetSvg width={28} height={28} autoPlay name="location" />
      <TextInput
        ref={ref}
        autoFocus
        defaultValue={textValue}
        onChangeText={delayedQuery}
        placeholder="Enter Location"
        placeholderTextColor={colors.gray5}
        style={styles.input}
        className="mx-2 py-0 flex-1 h-full text-base"
      />
      <ButtonView onPress={clearText}>
        <AssetSvg
          hide={!hasTextLength(textValue)}
          width={20}
          height={20}
          autoPlay
          name="cross_2"
        />
      </ButtonView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
    fontFamily: fonts.medium,
  },
});
