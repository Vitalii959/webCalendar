import "./icons.css";
import {icons} from "./iconsStorage";

import React from "react";

export type IconProps = {
  name: keyof typeof icons;
  color?: string;
  style?: React.CSSProperties;
};

export function Icons({name, color, ...restProps}: IconProps) {
  const iconPicker = icons[name];
  if (!iconPicker) return null;

  return (
    <div className='icons-box' {...restProps}>
      <div
        className='icons-image'
        style={{color: color ? color : "var(--icon-color)"}}
      >
        {iconPicker}
      </div>
    </div>
  );
}
