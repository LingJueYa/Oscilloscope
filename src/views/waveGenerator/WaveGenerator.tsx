{
  /*波形发生器组件 */
}
{
  /*导入 波形发生器 图表 组件 */
}
import WaveGenChart from "./WaveGenChart/WaveGenChart";
{
  /*导入 波形发生器 控制面板 组件 */
}
import WaveGenePanel from "./WaveGenPanel/WaveGenPanel";

export default function WaveGenerator() {
  return (
    <div className="h-screen w-full bg-white">
      <div className="flex flex-col w-full h-full px-10">
        <div className="flex flex-col w-full h-screen mt-10">
          <div className="h-1/5">
            <WaveGenePanel />
          </div>
          <div className="h-4/6">
            <WaveGenChart />
          </div>
        </div>
      </div>
    </div>
  );
}
