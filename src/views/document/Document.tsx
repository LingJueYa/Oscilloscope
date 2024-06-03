{
  /*文档支持组件 */
}
{
  /*导入第三方组件 */
}
import { useTranslation } from "react-i18next";
{
  /*导入组件*/
}
import Article from "../../components/Article";

export default function Document() {
  const { t } = useTranslation();

  return (
    <div className="w-screen h-fit bg-white overflow-y-auto px-10 pt-6">
      <div className="flex flex-col">
        <span className="text-4xl font-bold text-black">
          {t("document.title")}
        </span>
        <span className="mt-4 text-lg text-zinc-500">
          {t("document.last_edit")}
        </span>
      </div>
      <Article />
    </div>
  );
}
