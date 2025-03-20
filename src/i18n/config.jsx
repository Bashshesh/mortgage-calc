import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({

    debug: true,
    fallbackLng: 'ru',
    lng: 'ru',

    resources: {
        ru: {
            translations: require('./locales/ru/translation.json')
        },

        en: {
            translations: require('./locales/en/translation.json')
        },

        kz: {
            translations: require('./locales/kz/translation.json')
        },
    },
    ns: ['translations'],
    defaultNS: 'translations'

});

i18n.languages = ['ru', 'en', 'kz'];

export default i18n;