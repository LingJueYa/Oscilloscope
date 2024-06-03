{
  /*示波器 - 控制面板组件 */
}

{
  /*导入React */
}
import React, { useEffect, useCallback, useMemo } from "react";
{
  /*导入第三方库 */
}
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Radio, InputNumber, Input, message, Button } from "antd";
import { useWebSocket } from "ahooks";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { osChange } from "../../../store/os";
import { chartStore } from "../../../store/charts";
import { saveStore } from "../../../store/save";
{
  /*导入数据 */
}
import setting from "../../../../public/json/setting.json";
{
  /*导入组件 */
}
import SaveWave from "../../../components/SaveWave";

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

export default function OscilloscopePanel() {
  const osChangeSnapshot = useSnapshot(osChange);
  const saveSnapshot = useSnapshot(saveStore);
  const { t } = useTranslation();
  const { readyState, sendMessage, disconnect, connect } =
    useWebSocketHandler();

  const handleSampleRateChange = useSampleRateHandler(sendMessage);
  const handleSampleStepChange = useSampleStepHandler(sendMessage);
  const handleTriggerModeChange = useTriggerModeHandler(sendMessage);

  const saveWaveMemo = useMemo(() => <SaveWave />, []);

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence>
        {saveSnapshot.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex justify-center h-screen pt-24 pb-10"
          >
            {saveWaveMemo}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="mb-6 text-2xl text-black font-bold">
        {t("ospanel.oscilloscope_panel")}
      </span>
      <div className="flex items-center gap-4 mb-4">
        <Button type="primary" onClick={connect} disabled={readyState === 1}>
          {t("ospanel.run")}
        </Button>
        <Button onClick={disconnect} disabled={readyState === 3}>
          {t("ospanel.stop")}
        </Button>
        <div className="flex items-center">
          <Button
            type="primary"
            onClick={saveSnapshot.isOpen}
            disabled={readyState === 3}
          >
            {t("ospanel.save_current_waveform")}
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mb-4 mr-6">
          <span className="mr-3 text-black">
            {t("ospanel.sample_frequency")}
          </span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnapshot.sampleRateChange}
            onChange={handleSampleRateChange}
          />
          /Hz
        </div>
        <div className="mb-4  mr-6">
          <span className="mr-3 text-black">
            {t("ospanel.sample_interval")}
          </span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnapshot.sampleStepChange}
            onChange={handleSampleStepChange}
          />
          s
        </div>
        <div className="mb-4">
          <span className="mr-3 text-black">{t("ospanel.trigger_mode")}</span>
          <Radio.Group defaultValue={3} onChange={handleTriggerModeChange}>
            <Radio value={1}>{t("ospanel.none")}</Radio>
            <Radio value={2}>{t("ospanel.rising_edge")}</Radio>
            <Radio value={3}>{t("ospanel.falling_edge")}</Radio>
            <Radio value={4}>{t("ospanel.auto")}</Radio>
            <Radio value={5}>{t("ospanel.once")}</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}
