import { FC } from "react";
import InputHOC from "./InputHOC";
import "./inputText.css";

interface InputInterface {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  className?: any;
  name?: string;
  title?: string;
}

const Input: FC<InputInterface> = (props) => {
  const { title, placeholder, value, className, name } = props;
  return (
    <InputHOC title={title || ""}>
      <input
        placeholder={placeholder}
        type="text"
        className={"input-text emptyBorder no-border-input " + className}
        onChange={(e: any) => props.onChange?.(e)}
        value={value}
        name={name}
      />
    </InputHOC>
  );
};

export default Input;
