{
  /*示波器前端 */
}
{
  /*导入 React、ReactDOM、Route路由 */
}
import ReactDOM from "react-dom/client";
import { HashRouter, BrowserRouter } from "react-router-dom";
{
  /*导入 路由 组件*/
}
import Router from "./config/router";
{
  /*导入 滚动到顶部 组件*/
}
import ScrollToTop from "./components/ScrollToTop";
{
  /*导入媒体查询 */
}
import MediaQueryHandler from "./components/MediaQueryHandler";
{
  /*导入 i18n 支持 */
}
import "./config/i18n";

{
  /*
  获取根元素，并确保其为HTMLElement类型
  */
}
const rootElement = document.getElementById("root") as HTMLElement | null;
{
  /*定义 路由 类型*/
}
const mode = "hash";

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    mode === "hash" ? (
      <HashRouter>
        <ScrollToTop>
          <MediaQueryHandler>
            <Router />
          </MediaQueryHandler>
        </ScrollToTop>
      </HashRouter>
    ) : (
      <BrowserRouter>
        <ScrollToTop>
          <MediaQueryHandler>
            <Router />
          </MediaQueryHandler>
        </ScrollToTop>
      </BrowserRouter>
    )
  );
} else {
  console.error("未能找到ID为'root'的元素！");
}
