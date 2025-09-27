import "./button.css";
import {Icons} from "@/shared/ui/icons";

import classNames from "classnames";

import React, {type CSSProperties} from "react";
import {icons} from "@/shared/ui/icons/iconsStorage";

type ButtonProps = {
  children?: React.ReactNode;
  icon?: keyof typeof icons;
  iconColor?: string;
  iconSizes?: {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    fontSize?: CSSProperties["fontSize"];
  };
  options?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  icon,
  iconColor,
  iconSizes = {},
  options,
  disabled,
  onClick,
  ...restProps
}: ButtonProps) {
  const btnData = icon || children;

  return (
    <>
      {btnData && (
        <button
          className={classNames("button", options)}
          onClick={onClick}
          disabled={disabled}
          {...restProps}
        >
          {icon && (
            <div className='icon' style={iconSizes} data-testid='icon'>
              <Icons name={icon} color={iconColor || ""} />
            </div>
          )}
          <div className='title'>{children}</div>
        </button>
      )}
    </>
  );
}
