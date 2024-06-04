{
  /*采样频率提交 Hooks */
}

{
  /*导入 React */
}
import { useCallback } from "react";
{
  /*导入全局状态管理 */
}
import { osChangeStore } from "../store/os";

const useSampleRateHandler = (sendMessage: (message: string) => void) => {
  return useCallback(
    (value: number) => {
      osChangeStore.sampleRateChange = value;
      sendMessage && sendMessage(`${value}`);
    },
    [sendMessage]
  );
};

export default useSampleRateHandler;
