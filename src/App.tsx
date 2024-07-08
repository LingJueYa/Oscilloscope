{
  /*示波器顶级组件 */
}
{
  /*导入第三方库 */
}
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {ConfigProvider} from "antd"
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
{
  /*导入全局样式 */
}
import "./styles/app.css";
import "./styles/index.css";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { settingStore } from "./store/settings";
import { mediaQueryStore } from "./store/mediaquery";
{
  /*导入 菜单 组件 */
}
import Menu from "./views/menus/Menus";
{
  /*导入 设置 组件 */
}
import Settings from "./components/Settings";

const App: React.FC = () => {
  const settingSnapshot = useSnapshot(settingStore);
  const mediaQuerySnapshot = useSnapshot(mediaQueryStore);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="relative box-border flex bg-[#f6f6f6]">
        {!mediaQuerySnapshot.isMobile && (
          <div className="sticky top-0 left-0">
            <Menu />
          </div>
        )}
        <AnimatePresence>
          {settingSnapshot.open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex justify-center h-screen pt-24 pb-10"
            >
              <Settings />
            </motion.div>
          )}
        </AnimatePresence>
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default App;
