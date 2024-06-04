{
  /*示波器页面的状态管理 */
}
import { proxy } from "valtio";

interface OsChangeStore {
  sampleRateChange: number;
  sampleStepChange: number;
  triggerModeChange: string;
}

export const osChangeStore = proxy<OsChangeStore>({
  sampleRateChange: 10000,
  sampleStepChange: 1,
  triggerModeChange: "3",
});
