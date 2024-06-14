{
  /* 自动保存处理组件 */
}

{
  /*导入React */
}
import { useEffect } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import { Radio } from "antd";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { settingStore } from "../store/settings";

const AutoSave: React.FC = () => {
  const { t } = useTranslation();

  const settingSnapshot = useSnapshot(settingStore);

  return (
    <Radio.Group
      value={settingSnapshot.autoSave}
      onChange={(e) => (settingStore.autoSave = e.target.value)}
    >
      <Radio.Button value="true">{t("autosave.save_all")}</Radio.Button>
      <Radio.Button value="false">{t("autosave.discard_all")}</Radio.Button>
    </Radio.Group>
  );
};
export default AutoSave;
