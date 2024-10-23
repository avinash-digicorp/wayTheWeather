import {Button, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EmailDomains from './email-domains';
import InviteCodeGenerates from './invite-code-generates';
import {RollingText} from 'components';
export default () => {
  const [emails, setEmails] = useState([]);
  const [codes, setCodes] = useState([]);
  const [code, setCode] = useState('');
  const randomCode = () => {
    const length = 10;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let text = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possible.length);
      text += possible[randomIndex];
    }
    setCode(text);
    return text;
  };
  useEffect(() => {
    randomCode();
  }, []);
  return (
    <View>
      <Button title="Generate New" onPress={randomCode} />
      <EmailDomains emails={emails} setEmails={setEmails} />
      <InviteCodeGenerates codes={codes} setCodes={setCodes} />
    </View>
  );
};
