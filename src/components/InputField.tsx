{
  /*输入框组件*/
}

{
  /*导入 React */
}
import React, { ChangeEvent } from "react";
{
  /*导入 第三方库 */
}
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

interface InputFieldProps {
  className: string;
  id?: string;
  name?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  verify?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  className,
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
      className={className}
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
