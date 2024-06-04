{
  /*图表组件的状态管理 */
}
import { proxy } from "valtio";

interface ChartStore {
  chartData: { x: string | number; y: string | number }[];
}

export const chartStore = proxy<ChartStore>({
  chartData: [
    { x: "1", y: 1 },
    { x: "2", y: 1 },
    { x: "3", y: 1 },
    { x: "4", y: 1 },
    { x: "5", y: 1 },
    { x: "6", y: 1 },
    { x: "7", y: 1 },
    { x: "8", y: 1 },
    { x: "9", y: 1 },
  ],
});
