// 交直流切换组件

// 导入第三方库
import { Select } from "antd";

export default function Index() {
  return (
    <Select
      defaultValue="DC"
      style={{ width: 120 }}
      options={[
        {
          value: "DC",
          label: "直流DC",
        },
        { value: "AC", label: "交流AC" },
      ]}
    />
  );
}
