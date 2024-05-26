import { proxy } from "valtio";

export const i18nStore = proxy({
  language: "zh",
  ChangeLang(lang: string) {
    i18nStore.language = lang;
  },
});
