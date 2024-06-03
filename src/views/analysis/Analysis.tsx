{
  /*分析波形组件 */
}

{
  /*导入 React */
}
import React, { useMemo } from "react";
{
  /* 导入第三方组件*/
}
import { useTranslation } from "react-i18next";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
{
  /*导入 全局状态 管理 */
}
import { useSnapshot } from "valtio";
import { analysisStore } from "../../store/analysis";
{
  /*导入 组件 */
}
import AnalysisStep from "../../components/AnalysisStep";
import OscilloscopeChart from "../oscilloscope/OscilloscopeChart/OscilloscopeChart";
import SupportedFileTypes from "../../components/SupportedFileTypes";

const { Dragger } = Upload;

export default function Analysis() {
  const { t } = useTranslation();
  const analysisSnapshot = useSnapshot(analysisStore);

  const props = useMemo(
    () => ({
      name: "file",
      multiple: true,
      action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          analysisStore.isOpen;
          analysisStore.current = 1;
          analysisStore.analysisStep[0].title = "已完成";
          analysisStore.analysisStep[1].title = "进行中";
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    }),
    []
  );

  return (
    <div className="w-screen h-fit min-h-screen pt-6 px-8 bg-white overflow-y-auto">
      <span className="text-2xl font-bold text-black">
        {t("menus.analysis")}
      </span>
      <div className="mt-10 h-[400px] rounded-2xl">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{t("analysis.click_or_drag")}</p>
          <p className="ant-upload-hint">{t("analysis.upload_csv_files")}</p>
        </Dragger>
      </div>
      <div className="flex flex-col mt-10">
        <span className="text-xl font-bold text-black">
          {t("analysis.supported_file_types")}
        </span>
        <span className="mt-1 text-sm text-zinc-500">
          {t("analysis.if_you_already_have_a_file_in_the_following_format")}
        </span>
        <SupportedFileTypes />
        <div className="mb-20 px-10">
          <AnalysisStep />
        </div>
        {analysisSnapshot.open && (
          <div>
            <OscilloscopeChart rawData={analysisSnapshot} />
          </div>
        )}
      </div>
    </div>
  );
}
