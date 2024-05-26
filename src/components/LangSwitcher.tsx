{
  /* 语言切换组件 */
}
import { Radio } from "antd";
{
  /*导入 全局状态 */
}
import { useSnapshot } from "valtio";
import { i18nStore } from "../store/i18n";

const LangSwitcher = () => {
  {
    /*创建状态快照 */
  }
  const i18nSnapshot = useSnapshot(i18nStore);
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
