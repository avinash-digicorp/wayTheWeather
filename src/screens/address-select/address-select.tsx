import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {AssetSvg, ButtonView, Header} from 'components';
import colors from 'theme';
import {useRoute} from '@react-navigation/native';
import {hasTextLength} from 'utils';
import {fonts} from 'utils/fonts';

export default () => {
  const ref = useRef<TextInput>(null);
  const [textValue, setTextValue] = useState('');
  const route = useRoute();
  const {value, setValue} = route.params;
  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const onChangeText = (text: string) => {
    setTextValue(text);
    setValue(text);
  };
  const clearText = () => {
    setTextValue('');
    setValue('');
    ref.current?.clear();
  };
  return (
    <View style={styles.container}>
      <Header title="header.home" />
      <View className="flex-row justify-between border border-gray-200 rounded-md h-12 px-3 items-center">
        <AssetSvg width={28} height={28} autoPlay name="location" />
        <TextInput
          ref={ref}
          autoFocus
          defaultValue={textValue}
          onChangeText={onChangeText}
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
