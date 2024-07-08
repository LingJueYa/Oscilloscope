const zh = {
  ospanel: {
    oscilloscope_panel: "示波器面板",
    run: "运行",
    stop: "停止",
    save_current_waveform: "保存当前波形",
    sample_frequency: "采样频率",
    sample_interval: "采样间隔",
    once: "单次",
    auto: "自动",
    none: "无",
    rising_edge: "上升沿",
    falling_edge: "下降沿",
    trigger_mode: "触发方式",
  },
  oschart: {
    export_picture: "导出为图片",
  },
  notfound: {
    notFound: "对不起，您访问的页面不存在。",
    backHome: "回到主页",
  },
  menus: {
    project_name: "📺 国产化示波器",
    oscilloscope: "示波器",
    history: "历史记录",
    setting: "设置",
    document: "文档支持",
    analysis: "分析波形",
  },
  history: {
    loading_history: "加载历史记录中...",
    saveToCSV: "默认保存的文件格式为 CSV （.csv）",
    number: "序号",
    label: "文件名称",
    save_time: "保存时间",
    fileSize: "文件大小",
    download: "下载",
    delete: "删除",
    analytic_waveform: "解析波形",
    looking_to_parse: " 是否在寻找解析下载到的波形文件？",
  },
  document: {
    title: "国产示波器文档支持",
    last_edit: "最后一次编辑",
  },
  settings: {
    settings: "设置",
    language_setting: "语言设置",
    language_description: "您可以选择符合使用习惯的语言",
  },
  analysis: {
    click_or_drag: "单击或拖动文件到此区域进行上传",
    upload_csv_files: "支持上传从本网站下载的 .CSV 或 .Bin 格式文件",
    supported_file_types: "已支持的文件格式",
    if_you_already_have_a_file_in_the_following_format:
      "如果您已经有了以下格式的文件，请上传使用",
  },
  savewave: {
    save_waveform: "保存波形数据",
    give_the_waveform_a_name: "请给这段波形起一个名字",
  },
  autosave: {
    save_all: "保存全部",
    discard_all: "丢弃全部",
    auto_save: "自动保存方式",
    auto_save_description:
      "当您没有选择任何波形文件的时候，您可以选择是是全部保存还是全部舍弃",
  },
  tour: {
    beginTour: "来看看教程",
    run: "运行",
    runDescription: "点击这个按钮开启示波器运行。",
    stop: "停止",
    stopDescription: "点击这个按钮停止示波器运行。",
    sampleRate: "采样频率",
    sampleRateDescription:
      "采样频率是指示波器每秒能够采集信号的点数，采样频率决定了示波器能够捕捉到信号的最高频率。根据奈奎斯特定理，为了准确测量一个信号，采样频率至少需要是信号最高频率的两倍。高采样频率可以提供更精细的波形细节。",
    sampleInterval: "采样间隔",
    sampleIntervalDescription:
      "采样间隔是指相邻两个采样点之间的时间间隔，采样间隔与采样频率成反比。较小的采样间隔意味着能够更精确地测量信号的时间特性，但同时也会增加数据量，可能需要更多的存储空间。",
    triggerMode: "触发方式",
    triggerModeDescription:
      "触发方式是指示波器捕获和显示信号波形的起始点，正确的触发设置可以帮助用户稳定地观察和分析感兴趣的信号部分。例如，边沿触发可以捕捉到信号的上升沿或下降沿，而脉冲触发可以捕捉到特定脉冲宽度的信号。",
    download: "下载为图片",
    downloadDescription: "点击这个按钮可以将目前的波形图下载到本地。",
    saveWaveform: "保存当前波形",
    saveWaveformDescription:
      "点击这个按钮可以将目前的波形图保存下来，以供停止运行之后筛选。",
  },
};

export default zh;
