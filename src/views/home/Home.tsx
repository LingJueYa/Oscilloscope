{
  /*示波器控制面板组件 */
}
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { isOpenMenuState } from "../../store/isOpenMenu";
{
  /*导入 波形发生器 控制面板 组件 */
}
import WaveGeneratorPanel from "../waveGenerator/WaveGenPanel";
{
  /*导入 波形发生器 图表 组件 */
}
import WaveGeneratorChart from "../waveGenerator/WaveGeneratorChart";
{
  /*导入 示波器 控制面板 组件 */
}
import OscilloscopePanel from "../oscilloscope/OscilloscopePanel";
{
  /*导入 示波器 图表 组件 */
}
import OscilloscopeChart from "../oscilloscope/OscilloscopeChart";

export default function Home() {
  const isOpenMenu = useSnapshot(isOpenMenuState);
  return (
    <div className="h-fit w-full bg-white">
      <div className="flex flex-col w-full h-full px-10">
        <div className="flex items-center w-full h-auto mt-10">
          <div className="w-1/3">
            <WaveGeneratorPanel />
          </div>
          <div className="w-2/3">
            <WaveGeneratorChart />
          </div>
        </div>
        <div className="flex items-center w-full h-auto mt-10">
          <div className="w-1/3">
            <OscilloscopePanel />
          </div>
          <div className="w-2/3">
            <OscilloscopeChart />
          </div>
        </div>
      </div>
    </div>
  );
}
