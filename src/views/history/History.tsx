{
  /*历史记录组件 */
}
import React, { useMemo, useEffect } from "react";
{
  /*导入i18n组件部分 */
}
import { useTranslation } from "react-i18next";
{
  /*导入 全局状态  */
}
import { useSnapshot } from "valtio";
import { historyStore } from "../../store/history";
{
  /*导入antd组件 */
}
import { Space, Table } from "antd";
const { Column } = Table;

const History: React.FC = () => {
  {
    /*创建状态快照 */
  }
  const historySnapShot = useSnapshot(historyStore);
  {
    /*i18n */
  }
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
