{
  /*设置页面的状态管理 */
}
import { proxy } from "valtio";

interface SettingStore {
  open: boolean;
  isOpen: () => void;
}

export const settingStore = proxy<SettingStore>({
  open: false,
  isOpen: () => {
    settingStore.open = !settingStore.open;
  },
});
