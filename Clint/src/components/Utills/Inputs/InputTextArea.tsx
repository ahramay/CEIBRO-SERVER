import React, { FC } from "react";
import "./inputText.css";

interface InputTexAreatInterface {
  placeholder?: string;
  rows?: number;
  name?: string;
  onChange?: (e: any) => void;
  value?:string
}

const InputTextArea: FC<InputTexAreatInterface> = (props) => {
  const { placeholder, rows, onChange, name, value } = props;
  return (
    <div style={{ width: "100%" }}>
      <textarea
        placeholder={placeholder}
        className="input-text-area emptyBorder"
        rows={rows || 8}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};

export default InputTextArea;
