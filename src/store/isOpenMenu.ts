{
  /*菜单页面的状态管理 */
}
import { proxy } from "valtio";

export const isOpenMenuState = proxy({
  fold: true,
  isOpen: () => {
    isOpenMenuState.fold = !isOpenMenuState.fold;
  },
});
