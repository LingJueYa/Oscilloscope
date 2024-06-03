{
  /*路由组件 */
}
{
  /*导入 React */
}
import React, { Suspense, lazy } from "react";
{
  /*导入第三方库 */
}
import { Route, Routes } from "react-router-dom";

{
  /*导入组件*/
}
{
  /*导入 导航栏 组件*/
}
import App from "../App";
{
  /*导入 示波器 组件 */
}
import Oscilloscope from "../views/oscilloscope/Oscilloscope";
{
  /*导入 历史记录 组件 */
}
const History = lazy(() => import("../views/history/History"));
{
  /*导入 分析 组件 */
}
const Analysis = lazy(() => import("../views/analysis/Analysis"));
{
  /*导入 文档 组件 */
}
const Document = lazy(() => import("../views/document/Document"));
{
  /*导入 NotFound 组件 */
}
const Notfound = lazy(() => import("../views/notFound/Notfound"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Oscilloscope />} />
        <Route
          path="/history"
          element={
            <Suspense>
              <History />
            </Suspense>
          }
        />
        <Route
          path="/analysis"
          element={
            <Suspense>
              <Analysis />
            </Suspense>
          }
        />
        <Route
          path="/document"
          element={
            <Suspense>
              <Document />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <Notfound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
