import {create} from "zustand";

type modalStoreType = {
  title: string;
  modalContent: React.ReactNode | null;
  isOpen: boolean;
  editBtn?: () => void;
  deleteBtn?: () => void;
  setModalContent: (
    title: string,
    isOpen: boolean,
    children: React.ReactNode,
    editBtn?: () => void,
    deleteBtn?: () => void
  ) => void;
  closeModal: () => void;
};

export const useModalStore = create<modalStoreType>((set) => ({
  title: "",
  modalContent: null,
  isOpen: false,
  editBtn: undefined,
  deleteBtn: undefined,
  setModalContent: (title, isOpen, children, editBtn, deleteBtn) =>
    set({title, modalContent: children, isOpen, editBtn, deleteBtn}),
  closeModal: () => set({title: "", isOpen: false, modalContent: null})
}));
