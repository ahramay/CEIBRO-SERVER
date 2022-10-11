import { FC } from "react";
import "./inputText.css";

interface InputTextInterface {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: any;
  name?: any;
}

const InputText: FC<InputTextInterface> = (props) => {
  const { placeholder, value, className, name } = props;
  return (
    <div style={{ width: "100%" }}>
      <input
        placeholder={placeholder}
        type="text"
        className={"input-text emptyBorder " + className}
        onChange={(e: any) => props.onChange?.(e)}
        value={value}
        name={name}
      />
    </div>
  );
};

export default InputText;

InputText.defaultProps = {
  className: "",
};
