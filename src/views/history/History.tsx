{
  /*历史记录组件 */
}

{
  /*导入React */
}
import React, { useMemo, useEffect } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { historyStore } from "../../store/history";
{
  /*导入 数据 */
}
import history from "../../data/history";

const { Column } = Table;

const History: React.FC = () => {
  const historySnapShot = useSnapshot(historyStore);
  const { t } = useTranslation();
  {
    /* 定义数据 */
  }
  const data = useMemo(
    () =>
      historySnapShot.history.map((item) => ({
        id: item.id,
        name: item.name,
        timestamp: item.timestamp,
      })),
    [historySnapShot.history]
  );
  {
    /*请求数据 */
  }
  useEffect(() => {
    historyStore.getHistory();
  }, []);

  return (
    <div className="w-screen h-fit min-h-screen bg-white overflow-y-auto">
      {historySnapShot.isLoading ? (
        <div className="flex justify-center items-center h-full text-black text-4xl">
          {t("history.loading_history")}
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto p-6">
          <img
            src={history.historyTop}
            className="w-full h-[300px] object-cover rounded-2xl"
          />
          <div className="flex justify-between mt-6">
            <div className="flex flex-col text-black">
              <span className="text-2xl font-bold">{t("menus.history")}</span>
              <span className="mt-1 text-sm text-zinc-500">
                {t("history.saveToCSV")}
              </span>
            </div>
            <div className="flex flex-col">
              <Link
                to="/analysis"
                className="px-4 py-2 text-base text-sky-500 tracking-wider border border-sky-500 rounded-md  transition-all duration-300 ease-in-out hover:bg-sky-500 hover:text-white "
              >
                {t("history.analytic_waveform")}
              </Link>
              <span className="mt-1 text-sm text-zinc-500">
                {t("history.looking_to_parse")}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Table dataSource={data} className="w-full h-fit">
              <Column title={t("history.number")} dataIndex="id" key="id" />
              <Column title={t("history.label")} dataIndex="name" key="name" />
              <Column
                title={t("history.fileSize")}
                dataIndex="filesize"
                key="filesize"
              />
              <Column
                title={t("history.save_time")}
                dataIndex="timestamp"
                key="timestamp"
              />
              <Column
                title="Action"
                key="action"
                render={(_: any) => (
                  <Space size="middle">
                    <a>{t("history.download")}</a>
                    <a>{t("history.delete")}</a>
                  </Space>
                )}
              />
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
export default History;
