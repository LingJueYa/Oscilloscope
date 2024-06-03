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
import analysis from "../data/analysis";

const SupportedFileTypes = () => {
  const supportedFileTypes = useMemo(
    () =>
      analysis.support.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center w-full h-40 border border-gray-300 rounded-3xl hover:border-blue-500 transition-all duration-300 ease-in-out transform-gpu"
        >
          {item.icon === "/" ? (
            <span className="mt-4 text-black">{item.title}</span>
          ) : (
            <>
              <img src={item.icon} alt={item.title} className="w-20" />
              <span className="mt-4 text-black">{item.title}</span>
            </>
          )}
        </div>
      )),
    []
  );

  return (
    <div className="grid grid-cols-4 gap-4 mt-8 mb-14">
      {supportedFileTypes}
    </div>
  );
};

export default React.memo(SupportedFileTypes);
