{
  /*菜单页面的状态管理 */
}
import { proxy } from "valtio";

interface IsOpenMenuState {
  fold: boolean;
  isOpen: () => void;
}

export const isOpenMenuState = proxy<IsOpenMenuState>({
  fold: true,
  isOpen: () => {
    isOpenMenuState.fold = !isOpenMenuState.fold;
  },
});
