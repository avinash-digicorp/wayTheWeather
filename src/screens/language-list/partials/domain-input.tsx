import {Text} from 'components';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {validateDomain} from 'utils';

export const DomainInput = ({value, setValue}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const validate = input => {
    setValue(input);
    const validate = validateDomain(input);
    if (!validate) {
      setErrorMessage('Invalid domain. (e.g. gmail.com)');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, errorMessage && styles.inputError]}>
        <Text text="@" />
        <TextInput
          style={styles.input}
          placeholder="gmail.com"
          value={value}
          onChangeText={validate}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
