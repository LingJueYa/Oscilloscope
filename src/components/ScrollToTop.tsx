{
  /*全局路由监听组件 */
}

{
  /*导入React */
}
import React, { useEffect } from "react";
{
  /*导入第三方库 */
}
import { useLocation } from "react-router-dom";
{
  /*需要在所有路由变化都回到顶部，所以在一个顶层组件中监听路由的变化 */
}
const ScrollToTop: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};
export default ScrollToTop;
