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
  saveTemporary: any;
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
  //临时保存的数据
  saveTemporary: [],
});
