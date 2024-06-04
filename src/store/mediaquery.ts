{
  /*媒体查询状态 */
}
import { proxy } from "valtio";

export const mediaQueryStore = proxy({
  isMobile: false,
  isPortrait: true,
});
