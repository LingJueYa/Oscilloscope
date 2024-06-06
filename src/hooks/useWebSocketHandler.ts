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
import { useSnapshot } from "valtio";
import { chartStore } from "../store/charts";
import { wsStore } from "../store/ws";
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
  const wsSnapshot = useSnapshot(wsStore);
  const { readyState, sendMessage, latestMessage, disconnect, connect } =
    useWebSocket(`${setting.webSocketUrl}`, {
      reconnectLimit: 0, // 禁止自动重连
      reconnectInterval: 0, // 禁止自动重连
    });

  useEffect(() => {
    const connectionStatus = connectionStatusMap[readyState];
    console.log(`WebSocket connection status: ${connectionStatus}`);
    if (connectionStatus == "已连接") {
      message.success(`WebSocket${connectionStatus}`, 3);
    }
    if (connectionStatus == "已关闭") {
      message.warning(`WebSocket${connectionStatus}`, 3);
    }
  }, [readyState]);

  {
    /*心跳响应 */
  }
  useEffect(() => {
    if (readyState == 1 && latestMessage) {
      try {
        const parsedMessage = JSON.parse(latestMessage.data);
        const data = parsedMessage.data.body;

        if (data.type === "ping") {
          sendMessage(JSON.stringify({ type: "pong" }));
          console.log("Received ping, sent pong.");
        }

        if (wsSnapshot.receive) {
          if (Array.isArray(data)) {
            chartStore.chartData = data;
          }
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    }
  }, [latestMessage, sendMessage, wsSnapshot.receive]);

  const stopReceiving = () => {
    wsStore.receive = false;
  };

  const startReceiving = () => {
    wsStore.receive = true;
  };

  return {
    readyState,
    sendMessage,
    disconnect,
    connect,
    stopReceiving,
    startReceiving,
  };
};

export default useWebSocketHandler;
