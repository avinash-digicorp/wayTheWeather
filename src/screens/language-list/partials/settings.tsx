import {View} from 'react-native';
import React, {useState} from 'react';
import EmailDomains from './email-domains';
export default () => {
  const [emails, setEmails] = useState([]);
  return (
    <View>
      <EmailDomains emails={emails} setEmails={setEmails} />
    </View>
  );
};
