{
  /*菜单 组件 */
}

{
  /*导入React */
}
import React, { useState, useMemo, useCallback } from "react";
{
  /*导入第三方库 */
}
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Affix, Button, Menu, Layout } from "antd";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { isOpenMenuState } from "../../store/isOpenMenu";
import { settingStore } from "../../store/settings";
{
  /*导入数据 */
}
import menuLink, { iconMapping } from "../../data/menuLink";

const { Sider } = Layout;

const Menus: React.FC = () => {
  const { t } = useTranslation();
  const isOpenMenuSnap = useSnapshot(isOpenMenuState);
  const settingSnapshot = useSnapshot(settingStore);

  {
    /*创建 菜单组件 固定状态 */
  }
  const [top] = useState<number>(0);
  {
    /*获取 useNavigate 钩子函数，用于路由跳转 */
  }
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate]
  );
  {
    /*根据菜单数据判断行为函数 */
  }
  const handleMenuClick = useCallback(
    (item) => {
      if (item.url) {
        handleNavigate(item.url);
      } else if (item.label === "setting") {
        settingSnapshot.isOpen();
      }
    },
    [handleNavigate]
  );

  const items = useMemo(
    () =>
      menuLink.map((item) => ({
        key: item.id,
        icon: React.createElement(iconMapping[item.icon]),
        label: t(item.label),
        onClick: () => handleMenuClick(item),
      })),
    [t, handleMenuClick]
  );

  return (
    <Affix offsetTop={top}>
      <div className="w-auto h-screen bg-white overflow-hidden">
        <div className="flex flex-col justify-between h-full py-4 border-r border-gray-200">
          <div>
            <Sider trigger={null} collapsible collapsed={isOpenMenuSnap.fold}>
              <div className="flex justify-center">
                <span className="mb-6 text-xl text-black font-bold">
                  {isOpenMenuSnap.fold ? "📺" : t("project_name")}
                </span>
              </div>
              <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                inlineCollapsed={isOpenMenuSnap.fold}
                items={items}
              />
            </Sider>
          </div>
          <div className="flex justify-end pr-2">
            <Button
              type="primary"
              onClick={isOpenMenuSnap.isOpen}
              style={{ marginBottom: 16 }}
            >
              {isOpenMenuSnap.fold ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Affix>
  );
};
export default Menus;
