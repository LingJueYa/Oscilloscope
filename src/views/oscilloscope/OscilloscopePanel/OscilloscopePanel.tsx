// 示波器 - 控制面板组件

// 导入React
import React, { useEffect } from "react";
// 导入第三方库
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Radio, InputNumber, Button } from "antd";
// 导入自定义 hooks
import useWebSocketHandler from "../../../hooks/useWebSocketHandler";
import useSampleRateHandler from "../../../hooks/useSampleRateHandler";
import useSampleStepHandler from "../../../hooks/useSampleStepHandler";
import useTriggerModeHandler from "../../../hooks/useTriggerModeHandler";
// 导入 全局 状态管理
import { useSnapshot } from "valtio";
import { osChangeStore } from "../../../store/os";
import { saveStore } from "../../../store/save";
import { wsStore } from "../../../store/ws";
// 导入组件
import WaveformManager from "../../../components/WaveformManager";
import FullScale from "../../../components/fullScale/FullScale";
import Coupling from "../../../components/coupling/Index";

const OscilloscopePanel: React.FC<{
  refRun: React.RefObject<HTMLButtonElement>;
  refStop: React.RefObject<HTMLButtonElement>;
  refSampleRate: React.RefObject<HTMLInputElement>;
  refSampleInterval: React.RefObject<HTMLInputElement>;
  refTriggerMode: React.RefObject<HTMLDivElement>;
  onStartTour: () => void;
}> = ({
  refRun,
  refStop,
  refSampleRate,
  refSampleInterval,
  refTriggerMode,
  onStartTour,
}) => {
  const osChangeSnapshot = useSnapshot(osChangeStore);
  const saveSnapshot = useSnapshot(saveStore);
  const wsSnapshot = useSnapshot(wsStore);
  const { t } = useTranslation();
  const {
    readyState,
    sendMessage,
    connect,
    disconnect,
    startReceiving,
    stopReceiving,
  } = useWebSocketHandler();

  const handleSampleRateChange = useSampleRateHandler(sendMessage);
  const handleSampleStepChange = useSampleStepHandler(sendMessage);
  const handleTriggerModeChange = useTriggerModeHandler(sendMessage);

  {
    /*停止按钮函数（打开保存对话框，停止接收数据） */
  }
  const handleStop = () => {
    stopReceiving();
    saveStore.isOpen();
  };
  {
    /*如果点击保存对话框关闭，则停止连接并关闭对话框 */
  }
  useEffect(() => {
    if (wsSnapshot.isDisconnect) {
      disconnect();
      {
        /*将状态重新设置为false，确保下次可以激活 */
      }
      wsStore.isDisconnect = false;
    }
  }, [wsSnapshot.isDisconnect]);

  return (
    <div className="flex flex-col h-full bg-white">
      <AnimatePresence>
        {saveSnapshot.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex justify-center pt-16 pb-10"
          >
            <WaveformManager />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="mb-6 text-xl lg:text-2xl text-black font-bold">
        {t("ospanel.oscilloscope_panel")}
      </span>
      <div className="flex items-center gap-4 mb-4">
        <Button
          ref={refRun}
          type="primary"
          onClick={() => {
            connect();
            startReceiving();
          }}
          disabled={readyState === 1}
        >
          {t("ospanel.run")}
        </Button>
        <Button ref={refStop} onClick={handleStop} disabled={readyState === 3}>
          {t("ospanel.stop")}
        </Button>
        <Button type="primary" onClick={onStartTour}>
          {t("tour.beginTour")}
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="mb-4 mr-6 text-black">
          <span className="mr-3 text-black">
            {t("ospanel.sample_frequency")}
          </span>
          <InputNumber
            ref={refSampleRate}
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnapshot.sampleRateChange}
            onChange={handleSampleRateChange}
          />
          /Hz
        </div>
        <div className="mb-4 mr-6 text-black">
          <span className="mr-3 text-black">
            {t("ospanel.sample_interval")}
          </span>
          <InputNumber
            ref={refSampleInterval}
            size="large"
            min={1}
            max={100000}
            className="mr-2"
            value={osChangeSnapshot.sampleStepChange}
            onChange={handleSampleStepChange}
          />
          s
        </div>
        <div className="mb-4" ref={refTriggerMode}>
          <span className="mr-3 text-black">{t("ospanel.trigger_mode")}</span>
          <Radio.Group defaultValue={3} onChange={handleTriggerModeChange}>
            <Radio value={1}>{t("ospanel.none")}</Radio>
            <Radio value={2}>{t("ospanel.rising_edge")}</Radio>
            <Radio value={3}>{t("ospanel.falling_edge")}</Radio>
            <Radio value={4}>{t("ospanel.auto")}</Radio>
            <Radio value={5}>{t("ospanel.once")}</Radio>
          </Radio.Group>
          <div className="space-x-2 mt-2">
            <FullScale />
            <Coupling />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OscilloscopePanel;
