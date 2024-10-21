import {AnimatedIcon, AssetSvg} from 'components';
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  CurvedTransition,
  Easing,
  FadeOutLeft,
  FadingTransition,
  LinearTransition,
  RollOutLeft,
  runOnJS,
  SlideOutLeft,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import colors from 'theme';
import ArrowAnimation from './arrow';

const LanguageItem = props => {
  const [iconChanged, setIconChanged] = useState<boolean>(false);
  const [slightRight, setSlightRight] = useState<boolean>(false);
  const {item, selected, setSelected} = props;
  const isSelected = selected === item.id;
  const onSelectItem = () => {
    setIconChanged(false);
    setSelected(item.id);
  };

  const onAnimationEnd = (v: boolean) => {
    setSlightRight(true);
    if (v) {
      setIconChanged(v);
    }
  };
  return (
    <Animated.View
      layout={LinearTransition}
      style={[styles.item, isSelected && styles.itemSelected]}>
      <TouchableOpacity onPress={onSelectItem} style={styles.buttonView}>
        <Text style={styles.chatName}>{item.name}</Text>
      </TouchableOpacity>
      {isSelected && (
        <ArrowAnimation
          onSwipeSuccess={() => console.log('Swipe Successful!')}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    flex: 1,
  },
  item: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },

  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  itemSelected: {
    borderColor: colors.primary,
    borderBottomColor: colors.primary,
    borderWidth: 1,
  },
});

export default LanguageItem;
