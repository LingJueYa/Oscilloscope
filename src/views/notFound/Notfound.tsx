{
  /* NotFound 组件 */
}

{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import { Button, Result } from "antd";

export default function Notfound() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Result
        status="404"
        title="404"
        subTitle={t("notfound.not_found")}
        extra={<Button type="primary">{t("notfound.back_home")}</Button>}
      />
    </div>
  );
}
