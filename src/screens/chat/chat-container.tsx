import {useState} from 'react';

export const useChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>('');

  const onSubmit = (): void => {
    setLoading(true);
    setLoading(false);
  };

  const values = {loading, messageValue};
  const handlers = {setLoading, onSubmit, setMessageValue};

  return {...values, ...handlers};
};
