// 示波器控制面板组件

// 导入 React
import React, { useMemo, useState, useRef } from "react";
// 导入第三方库
import { useTranslation } from "react-i18next";
import { Tour } from "antd";
// 导入 全局 状态管理
import { useSnapshot } from "valtio";
import { chartStore } from "../../store/charts";
// 导入 示波器 控制面板 组件
import OscilloscopePanel from "../oscilloscope/OscilloscopePanel/OscilloscopePanel";
// 导入 示波器 图表 组件
import OscilloscopeChart from "./OscilloscopeChart/OscilloscopeChart";
// 导入数据
import tour from "../../data/tour";

const Oscilloscope: React.FC = () => {
  const { t } = useTranslation();
  const chartSnapshot = useSnapshot(chartStore);
  // Tour引导是否打开
  const [open, setOpen] = useState<boolean>(false);
  // 需要在Tour中使用的钩子
  const refRun = useRef(null);
  const refStop = useRef(null);
  const refSampleRate = useRef(null);
  const refSampleInterval = useRef(null);
  const refTriggerMode = useRef(null);
  const refDownload = useRef(null);
  const refSaveWaveform = useRef(null);
  // 步骤顺序
  const steps = useMemo(
    () =>
      tour(t, {
        refRun,
        refStop,
        refSampleRate,
        refSampleInterval,
        refTriggerMode,
        refDownload,
        refSaveWaveform,
      }),
    [t]
  );

  return (
    <div className="h-fit w-full bg-white">
      <div className="flex flex-col w-full h-full px-10">
        <div className="flex flex-col w-full h-screen mt-6">
          <div className="h-1/4">
            <OscilloscopePanel
              refRun={refRun}
              refStop={refStop}
              refSampleRate={refSampleRate}
              refSampleInterval={refSampleInterval}
              refTriggerMode={refTriggerMode}
              onStartTour={() => setOpen(true)}
            />
          </div>
          <div className="h-3/4 mt-40 lg:h-5/6 lg:mt-0">
            <OscilloscopeChart
              rawData={{ chartData: chartSnapshot.chartData }}
              refDownload={refDownload}
              refSaveWaveform={refSaveWaveform}
            />
          </div>
        </div>
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default Oscilloscope;
