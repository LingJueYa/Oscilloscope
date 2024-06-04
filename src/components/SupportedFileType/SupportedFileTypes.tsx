{
  /*分析 - 支持文件类型组件 */
}
{
  /* 导入 React*/
}
import React, { useMemo } from "react";
{
  /* 导入数据 */
}
import analysis from "../../data/analysis";
{
  /*导入组件 */
}
import SupportedFileTypeItem from "./SupportedFileTypeItem";

const SupportedFileTypes: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8 mb-14">
      {analysis.support.map((item) => (
        <SupportedFileTypeItem
          key={item.id}
          id={item.id}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default SupportedFileTypes;
