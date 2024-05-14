{
  /* NotFound 组件 */
}
{
  /*导入 组件库 */
}
import { Button, Result } from "antd";

export default function Notfound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
