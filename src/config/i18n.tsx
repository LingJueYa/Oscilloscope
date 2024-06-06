{
  /*国际化组件 */
}

{
  /*导入第三方库 */
}
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";
{
  /*导入数据 */
}
import zh from "../i18n/zh-CN";
import en from "../i18n/en-US";

{
  /*配置对象 */
}
const resources = {
  zh: { translation: zh },
  en: { translation: en },
};

{
  /*初始化 i18n*/
}
i18n
  .use(LanguageDetector) // 使用浏览器语言检测器
  .use(LocalStorageBackend) // 使用 localStorage 后端
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    backend: {
      expirationTime: 7 * 24 * 60 * 60 * 1000,
    },
    detection: {
      order: ["localStorage", "navigator"], // 检测顺序：先 localStorage 后浏览器语言
      caches: ["localStorage"], // 在 localStorage 中缓存
    },
  });

export default i18n;
