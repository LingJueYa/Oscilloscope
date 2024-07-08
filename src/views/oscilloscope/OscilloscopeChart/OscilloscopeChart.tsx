// 示波器 - 波形图组件

// 导入React
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
// 导入第三方库
import { useTranslation } from "react-i18next";
import Highcharts from "highcharts";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsReact from "highcharts-react-official";
// 导入工具函数
import { downloadScreenshot } from "../../../utils/screenshotUtils";
// 导入自定义hook
import useWaveAsBase from "../../../hooks/useWaveAsBaseHandler";

// Boost模式
HighchartsBoost(Highcharts);

// 判断是否支持WebGL
const hasWebGLSupport = () => {
  if (window.WebGLRenderingContext) {
    const canvas = document.createElement("canvas");
    const names = [
      "webgl",
      "experimental-webgl",
      "webgl2",
      "moz-webgl",
      "webkit-3d",
    ];
    return names.some((name) => {
      try {
        return !!canvas.getContext(name);
      } catch (e) {
        return false;
      }
    });
  }
  return false;
};

interface OscilloscopeChartProps {
  rawData: {
    readonly chartData: readonly {
      readonly x: number;
      readonly y: number;
    }[];
  };
  refDownload: React.RefObject<HTMLButtonElement>;
  refSaveWaveform: React.RefObject<HTMLButtonElement>;
}

const OscilloscopeChart: React.FC<OscilloscopeChartProps> = ({
  rawData,
  refDownload,
  refSaveWaveform,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const data = useMemo(
    () => rawData.chartData.map((point) => ({ ...point })),
    [rawData.chartData]
  );
  const { handleSaveCurrentWaveform } = useWaveAsBase(waveformRef);
  const [supportWebGL, setSupportWebGL] = useState(false);

  useEffect(() => {
    setSupportWebGL(hasWebGLSupport());
  }, []);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        height: "550px",
        animation: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
          boostThreshold: 10000, // 确保数据量不大时不启用 boost
          states: { hover: { enabled: false } },
          lineWidth: 3, // 设置线宽为 3 像素
        },
      },
      boost: {
        enabled: supportWebGL,
        pixelRatio: window.devicePixelRatio,
        useGPUTranslations: true,
        seriesThreshold: 5,
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
          boostThreshold: 10000, // 避免在数据量较小时启用 boost
          lineWidth: 3, // 在具体 series 对象中设置 lineWidth
          name: "Waveform",
          data: data,
        },
      ],
    }),
    [data, supportWebGL]
  );

  const handleDownload = useCallback(() => {
    if (waveformRef.current) {
      downloadScreenshot(waveformRef.current, "chart-screenshot.png");
    }
  }, []);

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
        ref={refDownload}
        type="button"
        onClick={handleDownload}
        className="absolute right-2 lg:static p-2 rounded-lg bg-yellow-400/20 text-orange-400 text-sm"
      >
        {t("oschart.export_picture")}
      </button>
      <button
        ref={refSaveWaveform}
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
