import i18n from 'i18next';
import 'config/config-i18n';
import en from './en.json';

export const setLocale = (locale: string) => {
  i18n.changeLanguage(locale);
};

export default (title: string, options = {}) => {
  return i18n.t(title, {...options});
};

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? P extends ''
      ? `${K}`
      : `${K}.${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? Join<K, Leaves<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

export type LocalizationKeys = Leaves<typeof en>;
