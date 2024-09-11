import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useWeather} from './weather-container';
import {Header, ScrollView, Text} from 'components';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {getFormattedTemperature} from 'utils/helper';
// @ts-ignore
import {BlurView} from '@react-native-community/blur';
import {ASSET_IMAGES} from 'assets/images';

export const Weather = () => {
  const {} = useWeather();
  const {weather, unit} = useSelector((state: RootState) => state.common);
  const isMetric = unit === 'metric';

  const {celsiusTemp, fahrenheitTemp} = getFormattedTemperature(
    weather?.main?.temp,
  );
  useEffect(() => {
    return () => {};
  }, []);

  const temperature = isMetric ? celsiusTemp : fahrenheitTemp;
  return (
    <View className="flex-1">
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2559484/pexels-photo-2559484.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.backgroundVideo]}
      />
      <View style={StyleSheet.absoluteFill}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={1}
        />
      </View>
      <ScrollView>
        <Header withBack={false} />
        <View className="flex-1 gap-4 justify-center items-center px-4">
          <BlurCard>
            <Text
              className="ml-2 text-white text-center text-[50px] font-light"
              text={temperature}
              style={styles.textShadow}
            />
            <Text
              className="text-white"
              text={weather?.name}
              style={styles.textShadow}
            />
          </BlurCard>
          <View className="flex-row items-center justify-between gap-4">
            <BlurCard style={{width: '50%'}}>
              <Text
                className="mr-4 text-white text-center text-[50px] font-light shadow-lg"
                text={temperature}
              />
            </BlurCard>
            <BlurCard style={{width: '50%'}}>
              <Text
                className="mr-4 text-white text-center text-[50px] font-light shadow-lg"
                text={temperature}
              />
            </BlurCard>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const BlurCard = (props: any) => (
  <View style={[styles.blurCard, props.style]}>
    <BlurView style={styles.blur} blurType="light" blurAmount={10} />
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  textShadow: {
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 3,
  },
  blur: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#ffffff22',
  },
  blurCard: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
