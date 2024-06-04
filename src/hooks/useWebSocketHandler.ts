{
  /*WebSocket Hooks */
}

{
  /*导入 React */
}
import { useEffect } from "react";
{
  /*导入第三方库 */
}
import { useWebSocket } from "ahooks";
import { message } from "antd";
{
  /*导入全局状态管理 */
}
import { chartStore } from "../store/charts";
{
  /*导入数据 */
}
import setting from "../../public/json/setting.json";

{
  /*创建 ws状态 */
}
const connectionStatusMap = {
  0: "正在连接",
  1: "已连接",
  2: "正在关闭",
  3: "已关闭",
};

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

export default useWebSocketHandler;
