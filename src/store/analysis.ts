{
  /*解析波形的状态管理 */
}
import { proxy } from "valtio";

const description1 = "上传波形文件";
const description2 = "正在分析波形";
const description3 = "渲染图表";

interface AnalysisStore {
  open: boolean;
  isOpen: () => void;
  current: number;
  analysisStep: {
    title: string;
    description: string;
  }[];
  readonly chartData: readonly {
    readonly x: string;
    readonly y: number;
  }[];
}

export const analysisStore = proxy<AnalysisStore>({
  open: false,
  isOpen: () => {
    analysisStore.open = !analysisStore.open;
  },
  current: 0,
  analysisStep: [
    {
      title: "进行中",
      description: description1,
    },
    {
      title: "等待中",
      description: description2,
    },
    {
      title: "等待中",
      description: description3,
    },
  ],
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
