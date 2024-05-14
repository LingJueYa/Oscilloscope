{
  /*路由组件 */
}
{
  /*导入 React */
}
import React, { Suspense, lazy } from "react";
{
  /*导入 ReactDOM、Route 路由 */
}
import { Route, Routes } from "react-router-dom";

{
  /*导入组件*/
}
{
  /*导入 导航栏 组件*/
}
import App from "../App";
import Home from "../views/home/Home";
{
  /*导入 历史记录 组件 */
}
const History = lazy(() => import("../views/history/History"));
{
  /*导入 NotFound 组件
  import Notfound from "../views/notFound/Notfound";*/
}
const Notfound = lazy(() => import("../views/notFound/Notfound"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/history"
          element={
            <Suspense>
              <History />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
