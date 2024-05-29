{
  /*示波器 - 控制面板组件 */
}

{
  /*导入React */
}
import { useEffect, useCallback } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import { Radio, InputNumber, Input, message, Button } from "antd";
import { useWebSocket } from "ahooks";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { osChange } from "../../../store/os";
import { chartStore } from "../../../store/charts";
{
  /*导入数据 */
}
import setting from "../../../../public/json/setting.json";

{
  /*创建 ws状态 */
}
const connectionStatusMap = {
  0: "正在连接",
  1: "已连接",
  2: "正在关闭",
  3: "已关闭",
};

{
  /*WebSocket */
}
const useWebSocketHandler = () => {
  const { readyState, sendMessage, latestMessage, disconnect, connect } =
    useWebSocket(`${setting.webSocketUrl}`);

  useEffect(() => {
    const connectionStatus = connectionStatusMap[readyState];
    if (connectionStatus) {
      message.success(`WebSocket${connectionStatus}`, 3);
    }
  }, [readyState]);
  {
    /*心跳响应 */
  }
  useEffect(() => {
    if (latestMessage) {
      try {
        const data = JSON.parse(latestMessage.data).message;
        chartStore.chartData = data;
        if (data.type === "ping") {
          sendMessage(JSON.stringify({ type: "pong" }));
          console.log("Received ping, sent pong.");
        } else {
          console.log("Received message:", latestMessage.data);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    }
  }, [latestMessage, sendMessage]);

  return { readyState, sendMessage, disconnect, connect };
};

{
  /*采样频率提交函数 */
}
const useSampleRateHandler = (sendMessage) => {
  return useCallback(
    (value) => {
      osChange.sampleRateChange = value;
      sendMessage && sendMessage(`${value}`);
    },
    [sendMessage]
  );
};

{
  /*取样间隔提交函数 */
}
const useSampleStepHandler = (sendMessage) => {
  return useCallback(
    (value) => {
      osChange.sampleStepChange = value;
      sendMessage && sendMessage(`${value}`);
    },
    [sendMessage]
  );
};

{
  /*触发方式提交函数 */
}
const useTriggerModeHandler = (sendMessage) => {
  return useCallback(
    (e) => {
      osChange.triggerModeChange = e.target.value;
      sendMessage && sendMessage(`${e.target.value}`);
    },
    [sendMessage]
  );
};

{
  /*保存波形标签提交函数 */
}
const useSaveWaveInputHandler = () => {
  return (e) => {
    osChange.input = e.target.value;
    osChange.uploadTime = String(Date.now());
  };
};

export default function OscilloscopePanel() {
  const osChangeSnap = useSnapshot(osChange);
  const { t } = useTranslation();
  const { readyState, sendMessage, disconnect, connect } =
    useWebSocketHandler();

  const handleSampleRateChange = useSampleRateHandler(sendMessage);
  const handleSampleStepChange = useSampleStepHandler(sendMessage);
  const handleTriggerModeChange = useTriggerModeHandler(sendMessage);
  const handleSaveWaveInput = useSaveWaveInputHandler();

  return (
    <div className="flex flex-col h-full">
      <span className="mb-6 text-2xl text-black font-bold">
        {t("oscilloscope_panel")}
      </span>
      <div className="flex gap-4 mb-2">
        <Button type="primary" onClick={connect} disabled={readyState === 1}>
          {t("run")}
        </Button>
        <Button onClick={disconnect} disabled={readyState === 3}>
          {t("stop")}
        </Button>
        <div className="flex items-center">
          <span className="text-black">
            {t("please_enter_the_waveform_label")}：
          </span>
          <Input
            placeholder={t("give_the_waveform_a_name")}
            className="w-40 h-10 mr-4"
            onChange={handleSaveWaveInput}
          />
          <Button
            type="primary"
            onClick={osChange.savewave}
            disabled={readyState === 3}
          >
            {t("save_current_waveform")}
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">{t("sample_frequency")}</span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnap.sampleRateChange}
            onChange={handleSampleRateChange}
          />
          /Hz
        </div>
        <div className="mb-4 text-black">
          <span className="mr-3 text-black">{t("sample_interval")}</span>
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
        <span className="mr-3 text-black">{t("trigger_mode")}</span>
        <Radio.Group defaultValue={3} onChange={handleTriggerModeChange}>
          <Radio value={1}>{t("none")}</Radio>
          <Radio value={2}>{t("rising_edge")}</Radio>
          <Radio value={3}>{t("falling_edge")}</Radio>
          <Radio value={4}>{t("auto")}</Radio>
          <Radio value={5}>{t("once")}</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
