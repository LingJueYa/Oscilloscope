{
  /*国际化组件 */
}

{
  /*导入第三方库 */
}
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;
