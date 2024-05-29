{
  /*示波器顶级组件 */
}

{
  /*导入第三方库 */
}
import { Outlet } from "react-router-dom";
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
{
  /*导入 菜单 组件 */
}
import Menu from "./views/menus/Menus";
{
  /*导入 设置 组件 */
}
import Settings from "./components/Settings";

const App = () => {
  const settingSnapshot = useSnapshot(settingStore);

  return (
    <div className="relative box-border flex bg-[#f6f6f6]">
      <div className="sticky top-0 left-0">
        <Menu />
      </div>
      {settingSnapshot.open && (
        <div className="flex justify-center my-5 z-50">
          <Settings />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default App;
