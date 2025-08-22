import "./toast.css";
import React from "react";
import {Icons} from "@/shared/ui-kit/icons";

type Props = {
  children: React.ReactNode;
  showToast: boolean;
  onCloseClick: () => void;
};

export function Toast({
  children,
  showToast,
  onCloseClick,

  ...restProps
}: Props) {
  return (
    <>
      <div className={`toast ${showToast ? "active" : ""}`} {...restProps}>
        <div className='toast__message'>{children}</div>
        <button className='toast__closeBtn' onClick={onCloseClick}>
          <Icons name={"close"} />
        </button>
      </div>
    </>
  );
}
