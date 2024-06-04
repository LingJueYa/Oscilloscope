{
  /*媒体查询状态 */
}
import { proxy } from "valtio";

interface MediaQueryStore {
  isMobile: boolean;
  isPortrait: boolean;
}

export const mediaQueryStore = proxy<MediaQueryStore>({
  isMobile: false,
  isPortrait: true,
});
