const en = {
  ospanel: {
    oscilloscope_panel: "Oscilloscope Panel",
    run: "Run",
    stop: "Stop",
    save_current_waveform: "Save Current Waveform",
    sample_frequency: "Sample Frequency",
    sample_interval: "Sample Interval",
    once: "Once",
    auto: "Auto",
    none: "None",
    rising_edge: "Rising Edge",
    falling_edge: "Falling Edge",
    trigger_mode: "Trigger Mode",
  },
  oschart: {
    export_picture: "Export picture",
  },
  notfound: {
    notFound: "Sorry, the page you visited does not exist.",
    backHome: "Back Home",
  },
  menus: {
    project_name: "📺 Oscilloscope",
    oscilloscope: "Oscilloscope",
    history: "History",
    setting: "Setting",
    document: "Document",
    analysis: "Analysis",
  },
  history: {
    loading_history: "Loading history...",
    saveToCSV: "The default file format is CSV (.csv).",
    number: "Number",
    label: "File name",
    save_time: "Save Time",
    fileSize: "File Size",
    download: "Download",
    delete: "Delete",
    analytic_waveform: "Analytic waveform",
    looking_to_parse: "Looking to parse the downloaded waveform file",
  },
  document: {
    title: "国产示波器文档支持",
    last_edit: "最后一次编辑",
  },
  settings: {
    settings: "Settings",
    language_setting: "Language Setting",
    language_description: "Select the language you want to use",
  },
  analysis: {
    click_or_drag: "Click or drag file to this area to upload",
    upload_csv_files:
      "You can upload CSV or Bin files downloaded from this website",
    supported_file_types: "Supported file types",
    if_you_already_have_a_file_in_the_following_format:
      "If you already have a file in the following format, please upload it to use",
  },
  savewave: {
    save_waveform: "The default file format is CSV (.csv).",
    give_the_waveform_a_name: "Give the Waveform a Name",
  },
  autosave: {
    save_all: "Save all",
    discard_all: "Discard all",
    auto_save: "Auto Save",
    auto_save_description:
      "When you do not select any waveform file,You can choose whether to save all or discard all",
  },
  tour: {
    beginTour: "Check out the tutorial",
    run: "Run",
    runDescription: "Click this button to start the oscilloscope running.",
    stop: "Stop",
    stopDescription: "Click this button to stop the oscilloscope.",
    sampleRate: "Sampling frequency",
    sampleRateDescription:
      "The sampling frequency refers to the number of signals that the oscilloscope can collect per second, and the sampling frequency determines the highest frequency that the oscilloscope can capture the signal. According to Nyquist's theorem, in order to accurately measure a signal, the sampling frequency needs to be at least twice the highest frequency of the signal. High sampling frequencies provide finer waveform details.",
    sampleInterval: "Sampling interval",
    sampleIntervalDescription:
      "Sampling interval refers to the time interval between two adjacent sampling points, and the sampling interval is inversely proportional to the sampling frequency. The smaller sampling interval means that the time characteristics of the signal can be measured more accurately, but it also increases the amount of data and may require more storage space.",
    triggerMode: "Trigger mode",
    triggerModeDescription:
      "Trigger mode refers to the oscilloscope capture and display signal waveform starting point, the correct trigger setting can help the user to stably observe and analyze the interested part of the signal. For example, an edge trigger can capture the rising or falling edge of a signal, while a pulse trigger can capture a signal of a specific pulse width.",
    download: "Download as picture",
    downloadDescription:
      "Click this button to download the current waveform to your local.",
    saveWaveform: "Save current waveform",
    saveWaveformDescription:
      "Click this button to save the current waveform image for filtering after stopping the operation.",
  },
};

export default en;
