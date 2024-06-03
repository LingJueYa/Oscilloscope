{
  /*示波器页面的状态管理 */
}
import { proxy } from "valtio";

export const osChange = proxy({
  sampleRateChange: 10000,
  sampleStepChange: 1,
  triggerModeChange: "3",
});
