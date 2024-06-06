{
  /*分析波形信息 */
}
import csvIcon from "../assets/svg/csv.svg";
import binIcon from "../assets/svg/bin.svg";

const analysis: AnalysisConfig = {
  support: [
    {
      id: 1,
      icon: csvIcon,
      title: ".CSV",
    },
    {
      id: 2,
      icon: binIcon,
      title: ".Bin",
    },
    {
      id: 3,
      icon: "/",
      title: "待支持...",
    },
    {
      id: 4,
      icon: "/",
      title: "待支持...",
    },
  ],
};

export interface AnalysisConfig {
  support: {
    id: number;
    icon: string;
    title: string;
  }[];
}

export default analysis;
