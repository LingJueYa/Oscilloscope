{
  /*历史数据页面的状态管理 */
}
import { proxy } from "valtio";

interface HistoryStore {
  history: any[];
  error: string | null;
  isLoading: boolean;
  getHistory: () => Promise<void>;
}

export const historyStore = proxy<HistoryStore>({
  history: [],
  error: null,
  isLoading: false,
  getHistory: async () => {
    try {
      historyStore.isLoading = true;
      const response = await fetch("http://localhost:8080/view/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      historyStore.history = data;
    } catch (error) {
      historyStore.error = error.message;
    } finally {
      historyStore.isLoading = false;
    }
  },
});
