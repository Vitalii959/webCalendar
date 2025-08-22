import "./inputField.css";
import {Icons} from "@/shared/ui-kit/icons";
import classNames from "classnames";
import React, {useState} from "react";

type InputFieldProps = {
  title: string;
  type?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export function InputField({
  title,
  type,
  error,
  value,
  onChange,

  ...restProps
}: InputFieldProps) {
  const [inputType, setPasswordType] = useState(type);

  const isPassword = type === "password";
  function handleTogglePassword() {
    if (isPassword) {
      setPasswordType((prev) => (prev === "password" ? "text" : "password"));
    }
  }
  return (
    <div className='inputField'>
      <label className='inputField-label'>{title}</label>
      <div className={classNames(`inputBox`, {inputFieldError: error})}>
        <input
          className='inputField-input'
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          type={inputType}
          {...restProps}
        />
        {isPassword && (
          <button className='eye' onClick={handleTogglePassword}>
            <Icons name={inputType === "password" ? "eyeClose" : "eye"} />
          </button>
        )}
      </div>

      {error && <p className='inputField-error-text'>{error}</p>}
    </div>
  );
}
