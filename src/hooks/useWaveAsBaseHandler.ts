{
  /*保存波形为base64图片 */
}
{
  /*导入第三方库 */
}
import domtoimage from "dom-to-image";
import { message } from "antd";
{
  /*导入全局状态管理*/
}
import { saveStore } from "../store/save";
{
  /*导入自定义hook */
}
import useWebSocketHandler from "../hooks/useWebSocketHandler";

const useWaveAsBase = (waveformRef) => {
  const { sendMessage, readyState } = useWebSocketHandler();

  const handleSaveCurrentWaveform = async () => {
    const timestamp = new Date().toISOString();

    try {
      const dataUrl = await domtoimage.toPng(waveformRef.current);
      saveStore.saveTemporary.push({ timestamp, image: dataUrl });
      if (readyState === 1) {
        // 确保 WebSocket 连接是打开的
        sendMessage(
          JSON.stringify({
            action: 0,
            typ: 0,
            arg: { idx: saveStore.saveTemporary.length - 1, timestamp },
          })
        );
      }
      message.success("波形保存成功");
    } catch (error) {
      console.error("保存波形图片时出错:", error);
      message.error("保存波形失败");
    }
  };

  return { handleSaveCurrentWaveform };
};

export default useWaveAsBase;
