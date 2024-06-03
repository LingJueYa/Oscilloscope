{
  /*示波器 - 图表组件 */
}

{
  /*导入React */
}
import React, { useMemo } from "react";
{
  /*导入第三方库 */
}
import { Line } from "@ant-design/charts";

interface OscilloscopeChartProps {
  rawData: {
    readonly chartData: readonly {
      readonly x: string;
      readonly y: number;
    }[];
  };
}

const OscilloscopeChart: React.FC<OscilloscopeChartProps> = ({ rawData }) => {
  const data = rawData.chartData;
  {
    /*图表配置 */
  }
  const config = useMemo(
    () => ({
      // 选框
      interaction: { brushFilter: true },
      // 第一次进入动画
      animate: { enter: { type: "fadeIn" }, update: { type: "morphing" } },
      tooltip: {
        items: [
          { channel: "x", name: "Div", color: "red" },
          { channel: "y", name: "电压" },
        ],
      },
      // 滑块范围栏
      slider: {
        x: {},
      },
    }),
    []
  );

  return (
    <div className="w-full h-full">
      <Line {...config} data={data} xField="x" yField="y" />
    </div>
  );
};
export default React.memo(OscilloscopeChart);
