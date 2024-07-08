// 引导数据

const tour = (t, refs) => [
  {
    title: t("tour.run"),
    description: t("tour.runDescription"),
    target: () => refs.refRun.current,
  },
  {
    title: t("tour.stop"),
    description: t("tour.stopDescription"),
    target: () => refs.refStop.current,
  },
  {
    title: t("tour.sampleRate"),
    description: t("tour.sampleRateDescription"),
    target: () => refs.refSampleRate.current,
  },
  {
    title: t("tour.sampleInterval"),
    description: t("tour.sampleIntervalDescription"),
    target: () => refs.refSampleInterval.current,
  },
  {
    title: t("tour.triggerMode"),
    description: t("tour.triggerModeDescription"),
    target: () => refs.refTriggerMode.current,
  },
  {
    title: t("tour.download"),
    description: t("tour.downloadDescription"),
    target: () => refs.refDownload.current,
  },
  {
    title: t("tour.saveWaveform"),
    description: t("tour.saveWaveformDescription"),
    target: () => refs.refSaveWaveform.current,
  },
];

export default tour;
