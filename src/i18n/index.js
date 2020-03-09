import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import en from "./localization/en.json";
import ua from "./localization/ua.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    lng: "en",
    resources: {
      en: { translation: en },
      ua: { translation: ua }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
