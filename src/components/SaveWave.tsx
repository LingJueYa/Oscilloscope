{
  /*保存波形组件 */
}

{
  /*导入React */
}
import React, { useCallback, useMemo } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
{
  /*导入 全局状态 管理 */
}
import { useSnapshot } from "valtio";
import { saveStore } from "../store/save";
{
  /*导入 输入框组件 */
}
import InputField from "./InputField";

const SaveWave: React.FC = () => {
  const { t } = useTranslation();
  const saveSnapshot = useSnapshot(saveStore);

  const containerClass = useMemo(
    () =>
      saveSnapshot.open
        ? "fixed top-0 left-0 flex justify-center w-screen h-screen pt-24 pb-10 bg-white/60 backdrop-blur-md z-50"
        : "",
    [saveSnapshot.open]
  );

  const stopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleButtonClick = useCallback(
    () => saveSnapshot.isOpen(),
    [saveSnapshot.isOpen]
  );
  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      saveStore.savewave();
      saveStore.isOpen();
    },
    [saveSnapshot.wavename]
  );

  return (
    <div className={`text-xl ${containerClass}`} onClick={stopPropagation}>
      <div className="flex flex-col max-w-[800px] sm:min-w-[500px] h-fit mx-4 sm:mx-0 py-8 px-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between mb-4">
          <div className="pl-2 text-xl font-bold text-orange-400">
            {t("savewave.save_waveform")}
          </div>
          <button
            className="btn btn-square btn-outline btn-sm text-black hover:bg-orange-400 hover:border-orange-400 hover:text-white"
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
        <form
          className="w-full sm:w-full lg:w-[500px]"
          onSubmit={handleFormSubmit}
        >
          <InputField
            id="wavename"
            name="wavename"
            placeholder={t("savewave.give_the_waveform_a_name")}
            required
            value={saveSnapshot.wavename}
            verify={saveSnapshot.wavename}
            onChange={(e) => (saveStore.wavename = e.target.value)}
          />
          <button
            className="mt-6 px-7 w-28 h-12 border border-[#d6d6d6] bg-transparent text-base text-black rounded-[100px] cursor-pointer"
            type="submit"
          >
            保存!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveWave;
