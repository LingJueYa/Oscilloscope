import { proxy } from "valtio";

export const osChange = proxy({
  sampleRateChange: 10000,
  sampleStepChange: 1,
  triggerModeChange: "3",
});
