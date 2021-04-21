import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    resources: {
      ru,
    },
  });

export default i18n;
