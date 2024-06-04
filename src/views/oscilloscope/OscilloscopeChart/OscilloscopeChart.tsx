{
  /*示波器 - 图表组件 */
}

{
  /*导入React */
}
import React, { useRef, useMemo, useCallback } from "react";
{
  /*导入第三方库 */
}
import { Line } from "@ant-design/charts";
import { useTranslation } from "react-i18next";
{
  /*导入工具函数 */
}
import { downloadScreenshot } from "../../../utils/screenshotUtils";

interface OscilloscopeChartProps {
  rawData: {
    readonly chartData: readonly {
      readonly x: string;
      readonly y: number;
    }[];
  };
}

const OscilloscopeChart: React.FC<OscilloscopeChartProps> = ({ rawData }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
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
  {
    /*截图函数 */
  }
  const handleDownload = useCallback(() => {
    if (chartContainerRef.current) {
      downloadScreenshot(chartContainerRef.current, "chart-screenshot.png");
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <button
        type="button"
        onClick={handleDownload}
        className="absolute right-2 lg:static p-2 rounded-lg bg-yellow-400/20 text-orange-400 text-sm"
      >
        {t("oschart.export_picture")}
      </button>
      <div ref={chartContainerRef}>
        <Line {...config} data={data} xField="x" yField="y" />
      </div>
    </div>
  );
};
export default OscilloscopeChart;
