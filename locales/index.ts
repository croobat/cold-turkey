import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import es from './es.json';

i18n.use(initReactI18next).init({
	// @ts-ignore
	fallbackLng: 'en',
	lng: Localization.getLocales()[0].languageCode,
	compatibilityJSON: 'v3',
	resources: { en, es },
	interpolation: { escapeValue: false },
});

export default i18n;
