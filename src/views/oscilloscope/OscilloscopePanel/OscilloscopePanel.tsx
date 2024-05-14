{
  /*示波器控制面板 组件 */
}
{
  /*导入 useEffect */
}
import { useEffect, useRef, useMemo } from "react";
{
  /*导入 单选框 组件 */
}
import { Flex, Radio } from "antd";
{
  /*导入 输入框 组件 */
}
import { InputNumber } from "antd";
{
  /*导入 全局 信息组件 */
}
import { message } from "antd";
{
  /*导入 按钮 组件 */
}
import { Button, Space } from "antd";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { osChange } from "../../../store/os";
{
  /*导入 websocket */
}
import { useWebSocket } from "ahooks";
{
  /*导入 全局配置文件 */
}
import setting from "../../../../public/json/setting.json";

export default function OscilloscopePanel() {
  {
    /*定义 全局状态 快照 */
  }
  const osChangeSnap = useSnapshot(osChange);
  {
    /*定义 连接 websocket */
  }
  const { readyState, sendMessage, latestMessage, disconnect, connect } =
    useWebSocket(`${setting.webSocketUrl}`);

  {
    /*创建 ws状态 */
  }
  const connectionStatus = {
    0: "正在连接",
    1: "已连接",
    2: "正在关闭",
    3: "已关闭",
  }[readyState];

  useEffect(() => {
    if (connectionStatus === "已连接") {
      message.success("WebSocket连接已建立", 3);
    }
    if (connectionStatus === "正在连接") {
      message.success("WebSocket正在连接", 3);
    }
    if (connectionStatus === "正在关闭") {
      message.success("WebSocket正在关闭", 3);
    }
    if (connectionStatus === "已关闭") {
      message.success("WebSocket连接已关闭", 3);
    }
  }, [readyState]);
  {
    /*定义 采样频率 提交函数 */
  }
  const handleSampleRateChange = (value) => {
    osChange.sampleRateChange = value;
    sendMessage && sendMessage(`${value}`);
  };
  {
    /*定义 取样间隔 提交函数 */
  }
  const handleSampleStepChange = (value) => {
    osChange.sampleStepChange = value;
    sendMessage && sendMessage(`${value}`);
  };
  {
    /*定义 触发方式 提交函数 */
  }
  const handleTriggerModeChange = (e) => {
    osChange.triggerModeChange = e.target.value;
    sendMessage && sendMessage(`${e.target.value}`);
  };

  {
    // 测试 提交
    // const messageHistory = useRef<any[]>([]);
    // messageHistory.current = useMemo(
    //   () => messageHistory.current.concat(latestMessage),
    //   [latestMessage]
    // );
    // {messageHistory.current.map((message, index) => (
    //   <p key={index} style={{ wordWrap: "break-word" }}>
    //     {message?.data}
    //   </p>
    //))}
  }

  return (
    <div className="flex flex-col h-full ">
      <span className="mb-6 text-2xl text-black font-bold">示波器面板</span>
      <div className="flex gap-4 mb-2">
        <Button
          type="primary"
          onClick={() => connect && connect()}
          disabled={readyState === 1}
        >
          运行
        </Button>

        <Button
          onClick={() => disconnect && disconnect()}
          disabled={readyState === 3}
        >
          停止
        </Button>
      </div>
      <div className="flex">
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">采样频率/Hz</span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            value={osChangeSnap.sampleRateChange}
            onChange={handleSampleRateChange}
          />
        </div>
        <div className="mb-4">
          <span className="mr-3 text-black">取样间隔</span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnap.sampleStepChange}
            onChange={handleSampleStepChange}
          />
          s
        </div>
      </div>
      <div className="mb-4">
        <span className="mr-3 text-black">触发方式</span>
        <Radio.Group defaultValue={3} onChange={handleTriggerModeChange}>
          <Radio value={1}>无</Radio>
          <Radio value={2}>上升沿</Radio>
          <Radio value={3}>下降沿</Radio>
          <Radio value={4}>自动</Radio>
          <Radio value={5}>单次</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
