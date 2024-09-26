import {Text} from 'components';
import React, {useState} from 'react';
import {View, StyleSheet, Linking, Alert, TouchableOpacity} from 'react-native';

// Helper function to check and handle text types
const handlePress = text => {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex =
    /(\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
  const urlRegex = /(https?:\/\/[^\s]+)/i;

  if (emailRegex.test(text)) {
    Linking.openURL(`mailto:${text}`).catch(() => {
      Alert.alert('Unable to open email client');
    });
  } else if (phoneRegex.test(text)) {
    Linking.openURL(`tel:${text}`).catch(() => {
      Alert.alert('Unable to make a phone call');
    });
  } else if (urlRegex.test(text)) {
    Linking.openURL(text).catch(() => {
      Alert.alert('Unable to open link');
    });
  }
};

// Custom text component with "Read More" functionality
const MessageText = ({text, numberOfLines = 3}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Regex patterns for email, phone, and URL
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex =
    /(\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
  const urlRegex = /(https?:\/\/[^\s]+)/i;

  // Split text and identify email, phone, and URL
  const parts = text.split(/(\s+)/).map((part, index) => {
    if (emailRegex.test(part)) {
      return (
        <Text
          key={index}
          style={styles.linkText}
          onPress={() => handlePress(part)}>
          {part}
        </Text>
      );
    } else if (phoneRegex.test(part)) {
      return (
        <Text
          key={index}
          style={styles.linkText}
          onPress={() => handlePress(part)}>
          {part}
        </Text>
      );
    } else if (urlRegex.test(part)) {
      return (
        <Text
          key={index}
          style={styles.linkText}
          onPress={() => handlePress(part)}>
          {part}
        </Text>
      );
    } else {
      return <Text key={index}>{part}</Text>;
    }
  });

  return (
    <View>
      <Text
        style={styles.messageText}
        numberOfLines={isExpanded ? undefined : numberOfLines}>
        {parts}
      </Text>
      {text.length > 155 && (
        <TouchableOpacity onPress={() => setIsExpanded(v => !v)}>
          <Text style={styles.readMoreText}>
            {isExpanded ? `Read Less` : `Read More`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#0055FF',
    textDecorationLine: 'underline',
  },
  readMoreText: {
    color: '#0055FF',
    textDecorationLine: 'underline',
  },
});

export default MessageText;
