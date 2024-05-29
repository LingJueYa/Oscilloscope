{
  /*设置页面的状态管理 */
}
import { proxy } from "valtio";
export const settingStore = proxy({
  open: false,
  isOpen: () => {
    settingStore.open = !settingStore.open;
  },
});
