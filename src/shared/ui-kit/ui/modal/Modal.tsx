import {Icons} from "@/shared/ui-kit/icons";
import "./modal.css";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  editBtn?: () => void;
  deleteBtn?: () => void;
};

export function Modal({
  children,
  title,
  showModal,
  setShowModal,
  editBtn,
  deleteBtn,
  ...restProps
}: ModalProps) {
  return (
    <div className={`modal-wrapper ${showModal ? "active" : ""}`}>
      <div className='modal' {...restProps}>
        <div className='modal__header'>
          <h1 className='modal-title'>{title}</h1>
          <div className='buttons-container'>
            {editBtn === undefined ? (
              ""
            ) : (
              <button className='buttons' onClick={editBtn}>
                <Icons name='edit' color='black' />
              </button>
            )}
            {deleteBtn === undefined ? (
              ""
            ) : (
              <button className='buttons' onClick={deleteBtn}>
                <Icons name='delete' color='black' />
              </button>
            )}
            <button className='buttons' onClick={() => setShowModal(false)}>
              <Icons name='close' color='black' />
            </button>
          </div>
        </div>
        <div className='modal__content'>{children}</div>
      </div>
    </div>
  );
}
