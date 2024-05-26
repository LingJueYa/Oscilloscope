{
  /*菜单 组件 */
}
import React, { useState, useMemo, useCallback, useEffect } from "react";
{
  /*导入i18n组件部分 */
}
import { useTranslation } from "react-i18next";
{
  /*导入 menu */
}
import menuLink, { iconMapping } from "../../data/menuLink";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { isOpenMenuState } from "../../store/isOpenMenu";
import { i18nStore } from "../../store/i18n";
{
  /*导入 Link 组件 */
}
import { useNavigate } from "react-router-dom";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
{
  /*导入 目录、侧边栏 组件 */
}
import { Affix, Button, Menu, Layout } from "antd";
{
  /*导入 语言切换 按钮 */
}
import LangSwitcher from "../../components/LangSwitcher";

const { Sider } = Layout;

const Menus: React.FC = () => {
  {
    /*i18n */
  }
  const { t, i18n } = useTranslation();
  {
    /*创建全局状态快照 */
  }
  const isOpenMenuSnap = useSnapshot(isOpenMenuState);
  const i18nSnapshot = useSnapshot(i18nStore);
  {
    /*创建 菜单组件 固定状态 */
  }
  const [top, setTop] = useState<number>(0);
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
    /*定义 菜单 */
  }
  const items = useMemo(
    () =>
      menuLink.map((item) => ({
        key: item.id,
        icon: React.createElement(iconMapping[item.icon]),
        label: t(item.label),
        onClick: () => handleNavigate(item.url),
      })),
    [handleNavigate, t]
  );
  useEffect(() => {
    i18n.changeLanguage((i18n.language = i18nSnapshot.language));
  }, [i18nSnapshot.language]);

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
            <div className="flex justify-center my-5">
              <LangSwitcher />
            </div>
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
