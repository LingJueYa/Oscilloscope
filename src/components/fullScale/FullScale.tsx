// 量程选择 组件

// 导入第三方库
import { Select } from "antd";

export default function FullScale() {
  return (
    <Select
      defaultValue="1_25v"
      style={{ width: 120 }}
      options={[
        {
          value: "1_25v",
          label: "±1.25v",
        },
        { value: "2_5v", label: "±2_5v" },
        { value: "6v", label: "±6v" },
        { value: "12_5v", label: "±12_5v" },
      ]}
    />
  );
}
