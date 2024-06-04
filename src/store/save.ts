{
  /*保存波形的状态管理 */
}
import { proxy } from "valtio";
{
  /*导入全局提示框 */
}
import { message } from "antd";

interface SaveStore {
  open: boolean;
  isOpen: () => void;
  wavename: string;
  uploadTime: string;
  isLoading: boolean;
  error: string | null;
  savewave: () => Promise<void>;
}

export const saveStore = proxy<SaveStore>({
  open: false,
  isOpen: () => {
    saveStore.open = !saveStore.open;
  },
  wavename: "",
  uploadTime: "",
  isLoading: true,
  error: null,
  savewave: async () => {
    try {
      saveStore.isLoading = true;
      const response = await fetch("http://localhost:8080/view/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: saveStore.wavename,
          uploadtime: saveStore.uploadTime,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      message.success("数据保存成功");
      saveStore.wavename = "";
    } catch (error) {
      saveStore.error = error.message;
      message.error("数据保存失败:" + error.message);
    } finally {
      saveStore.isLoading = false;
    }
  },
});
