{
  /*分析 - 步骤组件 */
}

{
  /*导入 React */
}
import React, { useMemo } from "react";
{
  /*导入第三方库 */
}
import { Steps } from "antd";
{
  /*导入 全局状态 管理 */
}
import { useSnapshot } from "valtio";
import { analysisStore } from "../store/analysis";

const AnalysisStep = () => {
  const analysisSnapshot = useSnapshot(analysisStore);

  const steps = useMemo(
    () =>
      analysisSnapshot.analysisStep.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    [analysisSnapshot.analysisStep]
  );

  return <Steps current={analysisSnapshot.current} items={steps} />;
};

export default React.memo(AnalysisStep);
