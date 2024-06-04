{
  /*分析 - 支持类型组件 */
}
{
  /* 导入 React*/
}
import React from "react";

interface SupportedFileTypeItemProps {
  id: number;
  title: string;
  icon: string;
}

const SupportedFileTypeItem: React.FC<SupportedFileTypeItemProps> = ({
  id,
  title,
  icon,
}) => (
  <div
    key={id}
    className="flex flex-col justify-center items-center w-full h-40 border border-gray-300 rounded-3xl hover:border-blue-500 transition-all duration-300 ease-in-out transform-gpu"
  >
    {icon === "/" ? (
      <span className="mt-4 text-black">{title}</span>
    ) : (
      <>
        <img src={icon} alt={title} className="w-20" />
        <span className="mt-4 text-black">{title}</span>
      </>
    )}
  </div>
);

export default React.memo(SupportedFileTypeItem);
