import React from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';
import {isAndroidPlatform} from 'utils';

export const useKeyboard = (considerAndroid = false) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (!considerAndroid && isAndroidPlatform) {
      return () => {};
    }

    function onKeyboardHide() {
      setKeyboardHeight(0);
    }

    function onKeyboardShow(e: KeyboardEvent) {
      setKeyboardHeight(e.endCoordinates.height);
    }

    const showSubscription = Keyboard.addListener(
      isAndroidPlatform ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      isAndroidPlatform ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      !!hideSubscription && hideSubscription.remove();
      !!showSubscription && showSubscription.remove();
    };
  }, [considerAndroid]);

  return keyboardHeight;
};
