{
  /*媒体查询组件（手机、平板端页面控制） */
}
{
  /*导入 React */
}
import React, { useEffect } from "react";
{
  /*导入第三方组件 */
}
import { useNavigate, useLocation } from "react-router-dom";
{
  /*导入 全局状态管理 */
}
import { useSnapshot } from "valtio";
import { mediaQueryStore } from "../store/mediaquery";

interface MediaQueryHandlerProps {
  children: React.ReactNode;
}

const MediaQueryHandler: React.FC<MediaQueryHandlerProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mediaQuerySnapshot = useSnapshot(mediaQueryStore);

  useEffect(() => {
    const handleResize = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        );
      mediaQueryStore.isMobile = isMobileDevice;
      mediaQueryStore.isPortrait = window.innerHeight > window.innerWidth;

      if (isMobileDevice && window.innerHeight > window.innerWidth) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      if (
        isMobileDevice &&
        window.innerWidth > window.innerHeight &&
        location.pathname !== "/"
      ) {
        navigate("/");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate, location.pathname]);

  return (
    <>
      {mediaQuerySnapshot.isMobile && mediaQuerySnapshot.isPortrait && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white/60 backdrop-blur-md z-50">
          <span
            className="text-black absolute z-50"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            请将您的设备横屏使用。
          </span>
        </div>
      )}
      {children}
    </>
  );
};

export default MediaQueryHandler;
