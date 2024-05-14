import { proxy } from "valtio";
// 导入 axios
import axios from "axios";
// 导入 message 组件
import { message } from "antd";

// 定义 waveChange 状态
export const waveChange = proxy({
  waveTypeChange: "",
  freqChange: 100,
  dutyChange: 50,
  uMaxValueChange: 3.3,
  biasChange: 1.65,

  //发送方法
  SendData: async () => {
    try {
      const response = await axios.post("/", {
        waveTypeChange: waveChange.waveTypeChange,
        freqChange: waveChange.freqChange,
        dutyChange: waveChange.dutyChange,
        uMaxValueChange: waveChange.uMaxValueChange,
        biasChange: waveChange.biasChange,
      });

      if (response.data.status === 0 && response.data.message) {
        message.success("设置成功");
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("设置失败：", error);
      message.error("设置失败，请重试");
    }
  },
  // 获取数据方法
  GetData: async () => {
    try {
      const response = await axios.get("/");

      if (response.data.status === 0 && response.data.message) {
        message.success("获取参数成功");
        waveChange.waveTypeChange = response.data.waveTypeChange;
        waveChange.freqChange = response.data.freqChange;
        waveChange.dutyChange = response.data.dutyChange;
        waveChange.uMaxValueChange = response.data.uMaxValueChange;
        waveChange.biasChange = response.data.biasChange;
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.error("获取失败：", error);
      message.error("获取失败，请重试");
    }
  },
});
