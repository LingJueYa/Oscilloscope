{
  /*触发方式提交 Hooks */
}

{
  /*导入 React */
}
import { useCallback } from "react";
{
  /*导入第三方库 */
}
import { RadioChangeEvent } from "antd";
{
  /*导入全局状态管理 */
}
import { osChangeStore } from "../store/os";
const useTriggerModeHandler = (sendMessage: (message: string) => void) => {
  return useCallback(
    (e: RadioChangeEvent) => {
      osChangeStore.triggerModeChange = e.target.value;
      sendMessage && sendMessage(`${e.target.value}`);
    },
    [sendMessage]
  );
};

export default useTriggerModeHandler;
