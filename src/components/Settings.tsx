{
  /*˙设置组件 */
}

{
  /*导入React */
}
import { useCallback, useMemo } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
{
  /*导入 全局状态 管理 */
}
import { useSnapshot } from "valtio";
import { settingStore } from "../store/settings";
{
  /*导入组件 */
}
import LangSwitcher from "./LangSwitcher";

export default function Settings() {
  const settingSnapshot = useSnapshot(settingStore);
  const { t } = useTranslation();
  const containerClass = useMemo(
    () =>
      settingSnapshot.open
        ? "fixed top-0 left-0 flex justify-center w-screen h-screen pt-24 pb-10 bg-white/60 backdrop-blur-md z-50"
        : "",
    [settingSnapshot.open]
  );

  const stopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleButtonClick = useCallback(
    () => settingSnapshot.isOpen(),
    [settingSnapshot.isOpen]
  );

  return (
    <div className={`text-xl ${containerClass}`} onClick={stopPropagation}>
      <div className="flex flex-col max-w-[800px] sm:min-w-[500px] h-fit mx-4 sm:mx-0 py-8 px-6 bg-white rounded-xl">
        <div className="flex justify-between mb-4">
          <div className="pl-2 text-xl font-bold text-[#ff7c7c]">
            {t("settings")}
          </div>
          <button
            className="btn btn-square btn-outline btn-sm text-black hover:bg-[#ff7c7c] hover:border-[#ff7c7c] hover:text-white"
            onClick={handleButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <span>{t("language_setting")}</span>
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
}
