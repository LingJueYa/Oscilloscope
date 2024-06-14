{
  /*波形图筛选组件 */
}
{
  /*导入React */
}
import { useState, useCallback, useMemo } from "react";
{
  /*导入第三方库 */
}
import { useTranslation } from "react-i18next";
import { Button, Input, Table, Tag, Space, message } from "antd";
{
  /*导入自定义hooks */
}
import useWebSocketHandler from "../hooks/useWebSocketHandler";
{
  /*导入全局状态管理 */
}
import { useSnapshot } from "valtio";
import { saveStore } from "../store/save";
import { wsStore } from "../store/ws";
import { settingStore } from "../store/settings";

const WaveformManager = () => {
  const { t } = useTranslation();
  const saveSnapshot = useSnapshot(saveStore);
  const settingSnapshot = useSnapshot(settingStore);
  const { sendMessage, disconnect } = useWebSocketHandler();
  const [names, setNames] = useState(
    saveSnapshot.saveTemporary.reduce((acc, waveform) => {
      acc[waveform.timestamp] = waveform.name || "";
      return acc;
    }, {})
  );
  const [saved, setSaved] = useState(
    saveSnapshot.saveTemporary.reduce((acc, waveform) => {
      acc[waveform.timestamp] = waveform.persist || false;
      return acc;
    }, {})
  );
  const containerClass = useMemo(
    () =>
      saveSnapshot.open
        ? "fixed top-0 left-0 flex justify-center w-screen h-screen pt-24 pb-10 bg-white/60 backdrop-blur-md z-50"
        : "",
    [saveSnapshot.open]
  );

  const stopPropagation = useCallback((e) => e.stopPropagation(), []);

  const handlePersist = async (timestamp, name) => {
    if (name.trim() === "") {
      message.warning("请填写名称");
      return;
    }
    const messagePayload = JSON.stringify({
      action: 0,
      typ: 1,
      arg: { timestamp, name },
    });

    try {
      await sendMessage(messagePayload);
      setSaved((prevSaved) => ({
        ...prevSaved,
        [timestamp]: true,
      }));
      saveStore.saveTemporary = saveSnapshot.saveTemporary.map((waveform) =>
        waveform.timestamp === timestamp
          ? { ...waveform, name, persist: true }
          : waveform
      );

      message.success("保存成功");
    } catch (error) {
      message.error("保存失败");
    }
  };

  const handleComplete = () => {
    {
      /*检测是否全部没有保留 
    const allNotPersisted = saveSnapshot.saveTemporary.every(
      (waveform) => !waveform.persist
    );
    if (allNotPersisted) {
      if (settingSnapshot.autoSave) {
        saveSnapshot.saveTemporary.forEach((waveform) => {
          if (waveform.persist) {
            sendMessage(
              JSON.stringify({
                action: 0,
                typ: 1,
                arg: { timestamp: waveform.timestamp, name: waveform.name },
              })
            );
          }
        });
      }
    } else {
      saveSnapshot.saveTemporary.forEach((waveform) => {
        if (waveform.persist) {
          sendMessage(
            JSON.stringify({
              action: 0,
              typ: 1,
              arg: { timestamp: waveform.timestamp, name: waveform.name },
            })
          );
        }
      });
    }*/
    }
    saveStore.saveTemporary = [];
    wsStore.isDisconnect = true;
    saveStore.isOpen();
    disconnect();
    console.log("完成并断开 WebSocket 连接");
  };

  const handleNameChange = (timestamp, value) => {
    setNames((prevNames) => ({
      ...prevNames,
      [timestamp]: value,
    }));

    saveStore.saveTemporary = saveSnapshot.saveTemporary.map((waveform) =>
      waveform.timestamp === timestamp ? { ...waveform, name: value } : waveform
    );
  };

  const columns = [
    {
      title: "时间戳",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    {
      title: "波形图片",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="波形" className="w-40" />,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="relative">
          <Input
            className="py-3 px-4 w-full h-[50px] border border-[#d6d6d6] bg-white text-black text-base rounded-lg transition duration-500 ease-in-out hover:border-[#ff7c7c]"
            id="wavename"
            name="wavename"
            placeholder={t("savewave.give_the_waveform_a_name")}
            value={names[record.timestamp] || ""}
            onChange={(e) => handleNameChange(record.timestamp, e.target.value)}
            disabled={saved[record.timestamp]}
          />
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {saved[record.timestamp] ? (
            <Tag color="green">已保存</Tag>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                handlePersist(record.timestamp, names[record.timestamp] || "")
              }
            >
              保留
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={`text-xl ${containerClass}`} onClick={stopPropagation}>
      <div className="max-w-[800px] sm:min-w-[500px]  h-full p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
        <h2 className="mb-4 text-2xl font-bold  text-black">波形管理</h2>
        <Table
          columns={columns}
          dataSource={saveSnapshot.saveTemporary.map((waveform) => ({
            key: waveform.timestamp,
            ...waveform,
          }))}
        />
        <Button type="primary" onClick={handleComplete}>
          完成
        </Button>
      </div>
    </div>
  );
};

export default WaveformManager;
