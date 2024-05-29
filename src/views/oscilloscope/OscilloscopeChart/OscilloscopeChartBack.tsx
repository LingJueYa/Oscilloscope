import { useEffect, useRef, useMemo, useCallback } from "react";
import {
  lightningChart,
  SolidFill,
  ColorCSS,
  SolidLine,
  ColorHEX,
  emptyFill,
} from "@arction/lcjs";
import { makeCustomTheme } from "@arction/lcjs-themes";
import settings from "../../../../public/json/setting.json";
import { useSnapshot } from "valtio";
import { chartStore } from "../../../store/charts";

const OscilloscopeChart = () => {
  const chartSnapshot = useSnapshot(chartStore);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 初始化主题配置
  const myTheme = useMemo(
    () =>
      makeCustomTheme({
        isDark: false,
        gradients: true,
        effects: false,
        fontFamily: "Segoe UI, -apple-system, Verdana, Helvetica",
        backgroundColor: ColorHEX("#ffffffff"),
        textColor: ColorHEX("#000000ff"),
        dataColors: [ColorHEX("#0061ff")],
        axisColor: ColorHEX("#00000000"),
        gridLineColor: ColorHEX("#d6d6d6ff"),
        uiBackgroundColor: ColorHEX("#16161600"),
        uiBorderColor: ColorHEX("#ffffff00"),
        dashboardSplitterColor: ColorHEX("#2d2d2dff"),
      }),
    []
  );

  // 初始化图表
  useEffect(() => {
    const lc = lightningChart({
      license: settings.license,
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd.",
      },
    });

    const chart = lc.ChartXY({
      container: chartContainerRef.current,
      theme: myTheme,
    });

    chart
      .setBackgroundFillStyle(new SolidFill({ color: ColorCSS("white") }))
      .setSeriesBackgroundFillStyle(new SolidFill({ color: ColorCSS("white") }))
      .setSeriesBackgroundStrokeStyle(
        new SolidLine({
          thickness: 1,
          fillStyle: new SolidFill({ color: ColorCSS("white") }),
        })
      );

    const lineSeries = chart
      .addPointLineAreaSeries({
        dataPattern: "ProgressiveX",
      })
      .setAreaFillStyle(emptyFill);

    lineSeries.setMaxSampleCount({ mode: "auto", max: 1_000_000 });

    chartRef.current = chart;
    seriesRef.current = lineSeries;

    // 清理函数
    return () => {
      chart.dispose();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [myTheme]);

  const handleResize = useCallback(() => {
    if (chartRef.current) {
      chartRef.current.engine.layout();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // 更新数据函数
  const updateData = useCallback(() => {
    if (seriesRef.current && chartSnapshot.chartData) {
      const formattedData = chartSnapshot.chartData.map((point) => ({
        x: point.x,
        y: point.y,
      }));
      seriesRef.current.add(formattedData);
    }
    animationFrameRef.current = requestAnimationFrame(updateData);
  }, [chartSnapshot.chartData]);
  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ height: "460px", width: "1100px", marginTop: "40px" }}
    ></div>
  );
};
export default OscilloscopeChart;
