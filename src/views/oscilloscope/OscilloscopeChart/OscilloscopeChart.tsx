{
  /*示波器 - 图表组件 */
}

{
  /*导入React */
}
import React, { useRef, useEffect, useMemo, useCallback } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
{
  /*导入工具函数 */
}
import { downloadScreenshot } from "../../../utils/screenshotUtils";
import useWaveAsBase from "../../../hooks/useWaveAsBaseHandler";

interface OscilloscopeChartProps {
  rawData: {
    readonly chartData: readonly {
      readonly x: number;
      readonly y: number;
    }[];
  };
}

const OscilloscopeChart: React.FC<OscilloscopeChartProps> = ({ rawData }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const data = useMemo(
    () => rawData.chartData.map((point) => ({ ...point })),
    [rawData.chartData]
  );
  const { handleSaveCurrentWaveform } = useWaveAsBase(waveformRef);
  {
    /*图表配置 */
  }
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        height: "550px",
      },
      title: {
        text: null,
      },
      xAxis: {
        title: {
          text: "DIV",
        },
        gridLineWidth: 1,
        gridLineColor: "#f0f0f0",
      },
      yAxis: {
        title: {
          text: "电压/v",
        },
        gridLineWidth: 1,
        gridLineColor: "#f0f0f0",
      },
      series: [
        {
          name: "Waveform",
          data: data,
        },
      ],
    }),
    [data]
  );
  {
    /*截图函数 */
  }
  const handleDownload = useCallback(() => {
    if (waveformRef.current) {
      downloadScreenshot(waveformRef.current, "chart-screenshot.png");
    }
  }, []);
  {
    /*因为 high 图表组件没有自动监听，需要手动更新数据 */
  }
  useEffect(() => {
    if (waveformRef.current) {
      Highcharts.charts.forEach((chart) => {
        if (chart) {
          chart.series[0].setData(data, true);
        }
      });
    }
  }, [data]);
  return (
    <div className="relative w-full h-full">
      <button
        type="button"
        onClick={handleDownload}
        className="absolute right-2 lg:static p-2 rounded-lg bg-yellow-400/20 text-orange-400 text-sm"
      >
        {t("oschart.export_picture")}
      </button>
      <button
        type="button"
        onClick={handleSaveCurrentWaveform}
        className="absolute right-2 lg:static ml-4 p-2 rounded-lg bg-cyan-500/20 text-cyan-500 text-sm"
      >
        {t("ospanel.save_current_waveform")}
      </button>
      <div ref={waveformRef} className="h-full mt-6">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};
export default OscilloscopeChart;
