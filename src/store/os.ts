import { proxy } from "valtio";
{/*导入全局提示框 */ }
import { message } from "antd"

export const osChange = proxy({
  sampleRateChange: 10000,
  sampleStepChange: 1,
  triggerModeChange: "3",
  input:"",
  isLoading: true,
  error:null,
  savewave: async () => {
    try {
    osChange.isLoading = true;
    const response = await fetch('http://localhost:8080/view/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:osChange.input })
    });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      message.success("数据保存成功");
  } catch (error) {
      osChange.error = error.message;
      message.error("数据保存失败:" + error.message)
  } finally {
    osChange.isLoading = false;
  }
}

});
