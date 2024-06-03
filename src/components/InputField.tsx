{
  /*输入框组件*/
}
{
  /*导入 第三方库 */
}
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

const InputField = ({
  id,
  name,
  placeholder,
  required,
  value,
  onChange,
  verify,
}) => (
  <div className="relative">
    <input
      type="text"
      className="mt-6 py-3 px-6 w-full h-[30px] sm:h-[40px] lg:h-[50px] border border-[#d6d6d6] bg-white text-black text-base rounded-lg transition duration-500 ease-in-out hover:border-[#ff7c7c]"
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
    <div className="absolute right-4 bottom-3">
      {verify === "" ? (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          请输入
        </Tag>
      ) : (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已检查
        </Tag>
      )}
    </div>
  </div>
);

export default InputField;
