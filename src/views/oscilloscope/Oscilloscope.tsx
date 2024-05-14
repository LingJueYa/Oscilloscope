{
  /*示波器控制面板组件 */
}
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
{
  /*导入 示波器 控制面板 组件 */
}
import OscilloscopePanel from "../oscilloscope/OscilloscopePanel/OscilloscopePanel";
{
  /*导入 示波器 图表 组件 */
}
import OscilloscopeChart from "../oscilloscope/OscilloscopeChart/OscilloscopeChart";

export default function Oscilloscope() {
  return (
    <div className="h-screen w-full bg-white">
      <div className="flex flex-col w-full h-full px-10">
        <div className="flex flex-col w-full h-screen mt-10">
          <div className="h-1/4">
            <OscilloscopePanel />
          </div>
          <div className="h-4/6">
            <OscilloscopeChart />
          </div>
        </div>
      </div>
    </div>
  );
}
