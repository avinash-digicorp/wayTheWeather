import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useWeather} from './weather-container';
import {AnimatedBlurView, Header, ScrollView, Text} from 'components';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {getFormattedTemperature} from 'utils/helper';
import Video, {VideoRef} from 'react-native-video';
// @ts-ignore
import clouds from 'assets/videos/clouds.mp4';

export const Weather = () => {
  const {} = useWeather();
  const {weather, unit} = useSelector((state: RootState) => state.common);
  const videoRef = useRef<VideoRef>(null);
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
      <Video
        muted
        repeat
        controls={false}
        preventsDisplaySleepDuringVideoPlayback
        ref={videoRef}
        source={clouds}
        style={styles.backgroundVideo}
      />
      <AnimatedBlurView style={styles.backgroundVideo} />
      <ScrollView>
        <Header withBack={false} />
        <View>
          <View>
            <Text text={temperature} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
  },
});
