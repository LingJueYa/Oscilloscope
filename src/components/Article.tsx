{
  /*文章 组件*/
}

{
  /*导入 React */
}
import React, { useState, useEffect, useMemo } from "react";
{
  /*导入第三方库 */
}
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
{
  /*导入全局样式  */
}
import "../styles/article.css";
{
  /*导入 404 组件 */
}
import Notfound from "../views/notFound/Notfound";

const Article: React.FC = () => {
  {
    /*解析地址对应的 md 文件 */
  }
  const [mdContent, setMDContent] = useState<string>("");

  {
    /*获取对应的文章 */
  }
  useEffect(() => {
    fetch(`./posts/document.md`)
      .then((res) => res.text())
      .then((md) => setMDContent(md))
      .catch((error) => console.error("Error fetching Markdown:", error));
  }, []);

  return (
    <div className="w-full h-fit bg-white pb-10 overflow-hidden">
      {mdContent.length ? (
        <div className="article p-5 text-black break-all leading-relaxed tracking-wider">
          <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
            {mdContent}
          </ReactMarkdown>
        </div>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Article;
