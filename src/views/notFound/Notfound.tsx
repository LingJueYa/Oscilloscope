{
  /* NotFound 组件 */
}
{
  /*导入 组件库 */
}
import { Button, Result } from "antd";
{
  /*导入i18n组件部分 */
}
import { useTranslation } from "react-i18next";

export default function Notfound() {
  {
    /*i18n */
  }
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Result
        status="404"
        title="404"
        subTitle={t("not_found")}
        extra={<Button type="primary">{t("back_home")}</Button>}
      />
    </div>
  );
}
