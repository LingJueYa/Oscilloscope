{
  /*示波器控制面板组件 */
}
{
  /*导入 React */
}
import React, { useMemo, useCallback } from "react";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { chartStore } from "../../store/charts";
{
  /*导入 示波器 控制面板 组件 */
}
import OscilloscopePanel from "../oscilloscope/OscilloscopePanel/OscilloscopePanel";
{
  /*导入 示波器 图表 组件 */
}
import OscilloscopeChart from "./OscilloscopeChart/OscilloscopeChart";

export default function Oscilloscope() {
  const chartSnapshot = useSnapshot(chartStore);

  const oscilloscopePanelMemo = useMemo(() => <OscilloscopePanel />, []);
  const oscilloscopeChartMemo = useMemo(
    () => <OscilloscopeChart rawData={chartSnapshot} />,
    [chartSnapshot]
  );

  return (
    <div className="h-screen w-full bg-white">
      <div className="flex flex-col w-full h-full px-10">
        <div className="flex flex-col w-full h-screen mt-6">
          <div className="h-1/4">{oscilloscopePanelMemo}</div>
          <div className="h-3/4 mt-40 lg:h-5/6 lg:mt-0">
            {oscilloscopeChartMemo}
          </div>
        </div>
      </div>
    </div>
  );
}
