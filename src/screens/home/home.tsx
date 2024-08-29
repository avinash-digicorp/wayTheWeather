import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {useHomeContainer} from './home-container';
import DateTimeView from './partials/date-time-view';
import {SearchLocationView} from './partials/search-location-view';
import {ASSET_IMAGES} from 'assets/images';
import {AnimatedBlurView, LoadingButton} from 'components';

export default () => {
  const props = useHomeContainer();
  const {enterStartLocation, enterEndLocation} = props;
  return (
    <ImageBackground
      source={ASSET_IMAGES.bg}
      resizeMode="cover"
      className="flex-1">
      <AnimatedBlurView style={styles.blur}>
        <View className="gap-y-4 justify-evenly" style={styles.container}>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
            translucent
          />
          <SearchLocationView
            onPress={enterStartLocation}
            icon="locationPin"
            title="home.start_location"
            type="start"
          />
          <DateTimeView {...props} />
          <SearchLocationView
            onPress={enterEndLocation}
            icon="locationPin2"
            title="home.end_location"
            type="end"
          />
          <LoadingButton
            status={'idle'}
            titleFromStatusMap={{
              idle: 'Continue',
              loading: 'Submitting',
              success: 'Success',
              error: 'Declined',
            }}
          />
        </View>
      </AnimatedBlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  blur: {flex: 1},
  container: {
    flex: 1,
    maxHeight: '80%',
    marginTop: StatusBar.currentHeight ?? 60,
    paddingHorizontal: 15,
  },
});
