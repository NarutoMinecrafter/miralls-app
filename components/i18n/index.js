import i18n from "i18n-js";

i18n.fallbacks = true;
i18n.defaultLocale = "ru";

i18n.translations = {
  ru: require("./locale/ru.json"),
  ua: require("./locale/ua.json"),
  en: require("./locale/en.json"),
};

const _ = i18n.t;
export default _;
