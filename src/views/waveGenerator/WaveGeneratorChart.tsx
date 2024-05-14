import { Line } from "@ant-design/plots";

export default function WaveGeneratorChart() {
  const config = {
    data: {
      type: "fetch",
      value:
        "https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/line-connect-nulls.json",
      transform: [
        {
          type: "map",
          callback: (d) => ({
            ...d,
            close: new Date(d.date).getUTCMonth() < 3 ? NaN : d.close,
          }),
        },
      ],
    },
    xField: (d) => new Date(d.date),
    yField: "close",
    connectNulls: {
      connect: true,
      connectStroke: "#aaa",
    },
    axis: {
      x: {},
      y: {},
      line: true,
      arrow: true,
    },
  };
  return <Line {...config} />;
}
