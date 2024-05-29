{
  /*示波器 - 图表组件 */
}

{
  /*导入React */
}
import React from "react";
{
  /*导入第三方库 */
}
import { Line } from "@ant-design/charts";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { chartStore } from "../../../store/charts";

const OscilloscopeChart: React.FC = () => {
  const chartSnapshot = useSnapshot(chartStore);
  const data = chartSnapshot.chartData;
  {
    /*图表配置 */
  }
  const config = {
    data,
    title: {
      visible: true,
    },
    xField: "x",
    yField: "y",
  };

  return (
    <div className="w-full h-full">
      <Line {...config} />
    </div>
  );
};
export default OscilloscopeChart;
