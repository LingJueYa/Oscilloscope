{
  /* 波形发生器控制面板 */
}
import { useState } from "react";
{
  /*导入 单选框 组件 */
}
import { Flex, Radio } from "antd";
{
  /*导入 输入框 组件 */
}
import { InputNumber } from "antd";
{
  /*导入 按钮 组件 */
}
import { Button, Space } from "antd";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { waveChange } from "../../../store/waveGen";

export default function WaveGenePanel() {
  {
    /*定义 全局状态 快照 */
  }
  const waveChangeSnap = useSnapshot(waveChange);

  return (
    <div className="flex flex-col h-full">
      <span className="mb-6 text-2xl text-black font-bold">
        波形发生器控制面板
      </span>
      <div className="flex">
        <div className="flex items-center mb-4 mr-6">
          <span className="mr-3 text-black">波形选择</span>
          <Flex vertical gap="middle">
            <Radio.Group
              size="large"
              defaultValue="a"
              onChange={(e) => (waveChange.waveTypeChange = e.target.value)}
            >
              <Radio.Button value="a">正弦波</Radio.Button>
              <Radio.Button value="b">方波</Radio.Button>
              <Radio.Button value="c">锯齿波</Radio.Button>
            </Radio.Group>
          </Flex>
        </div>
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">频率</span>
          <Space>
            <InputNumber
              size="large"
              min={1}
              max={1500}
              value={waveChangeSnap.freqChange}
              onChange={(value) => (waveChange.freqChange = value)}
            />
          </Space>
        </div>
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">占空比</span>
          <InputNumber
            size="large"
            min={1}
            max={99}
            value={waveChangeSnap.dutyChange}
            onChange={(value) => (waveChange.dutyChange = value)}
          />
        </div>
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">峰值</span>
          <InputNumber
            size="large"
            min={1}
            max={3.3}
            value={waveChangeSnap.uMaxValueChange}
            onChange={(value) => (waveChange.uMaxValueChange = value)}
          />
        </div>
        <div className="mb-4">
          <span className="mr-3 text-black">偏置电压</span>
          <InputNumber
            size="large"
            min={1}
            max={3.3}
            value={waveChangeSnap.biasChange}
            onChange={(value) => (waveChange.biasChange = value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="primary" onClick={waveChange.SendData}>
          立即设置
        </Button>
        <Button onClick={waveChange.GetData}>获取参数</Button>
      </div>
    </div>
  );
}
