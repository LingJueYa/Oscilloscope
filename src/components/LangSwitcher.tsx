{
  /* 语言切换组件 */
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
import { i18nStore } from "../store/i18n";

const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const i18nSnapshot = useSnapshot(i18nStore);

  useEffect(() => {
    i18n.changeLanguage((i18n.language = i18nSnapshot.language));
  }, [i18nSnapshot.language]);

  return (
    <Radio.Group
      value={i18nSnapshot.language}
      onChange={(e) => i18nSnapshot.ChangeLang(e.target.value)}
    >
      <Radio.Button value="zh">中文</Radio.Button>
      <Radio.Button value="en">English</Radio.Button>
    </Radio.Group>
  );
};
export default LangSwitcher;
