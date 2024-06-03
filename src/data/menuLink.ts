{
  /*菜单数据 */
}
import {
  LineChartOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";

// 定义图标映射
export const iconMapping: { [key: string]: React.ComponentType<any> } = {
  LineChartOutlined: LineChartOutlined,
  ClockCircleOutlined: ClockCircleOutlined,
  DeploymentUnitOutlined: DeploymentUnitOutlined,
  SettingOutlined: SettingOutlined,
  CopyOutlined: CopyOutlined,
};

// 定义菜单项的类型
export interface MenuLinkItem {
  id: number;
  label: string;
  icon: keyof typeof iconMapping; // 使用 iconMapping 的键作为类型
  url?: string;
}

// 定义菜单项数据
const menuLink: MenuLinkItem[] = [
  {
    id: 1,
    label: "menus.oscilloscope",
    icon: "LineChartOutlined",
    url: "/",
  },
  {
    id: 2,
    label: "menus.history",
    icon: "ClockCircleOutlined",
    url: "/history",
  },
  {
    id: 3,
    label: "menus.analysis",
    icon: "DeploymentUnitOutlined",
    url: "/analysis",
  },
  {
    id: 4,
    label: "menus.setting",
    icon: "SettingOutlined",
  },
  {
    id: 5,
    label: "menus.document",
    icon: "CopyOutlined",
    url: "/document",
  },
];

export default menuLink;
