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
{
  /*导入 全局 状态管理 */
}
import { useSnapshot } from "valtio";
import { historyStore } from "../../store/history";

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
    []
  );
  {
    /*请求数据 */
  }
  useEffect(() => {
    historyStore.getHistory();
  }, []);

  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
      {historySnapShot.isLoading ? (
        <div className="flex justify-center items-center h-full text-black text-4xl">
          {t("loading_history")}
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto">
          <Table dataSource={data} className="w-full">
            <Column title={t("number")} dataIndex="id" key="id" />
            <Column title={t("label")} dataIndex="name" key="name" />
            <Column
              title={t("save_time")}
              dataIndex="timestamp"
              key="timestamp"
            />
            <Column
              title="Action"
              key="action"
              render={(_: any) => (
                <Space size="middle">
                  <a>{t("download")}</a>
                  <a>{t("delete")}</a>
                </Space>
              )}
            />
          </Table>
        </div>
      )}
    </div>
  );
};
export default History;
