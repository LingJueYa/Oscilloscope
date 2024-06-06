{
  /*国际化的状态管理 */
}
import { proxy } from "valtio";

interface I18nStore {
  language: string;
  ChangeLang: (lang: string) => void;
}

export const i18nStore = proxy<I18nStore>({
  language: "",
  ChangeLang(lang: string) {
    i18nStore.language = lang;
  },
});
