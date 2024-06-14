{
  /*设置页面的状态管理 */
}
import { proxy } from "valtio";

interface SettingStore {
  open: boolean;
  isOpen: () => void;
  // 自动保存处理
  autoSave: boolean;
}

export const settingStore = proxy<SettingStore>({
  open: false,
  isOpen: () => {
    settingStore.open = !settingStore.open;
  },
  autoSave: false,
});
