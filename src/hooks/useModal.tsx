import { Dispatch, SetStateAction, useState } from "react";

export interface IUseModalProps {
  cbBeforeOpen?: () => void;
}

export interface IUseModalReturnType {
  openModal: boolean;
  disableClose: boolean;
  setDisableClose: Dispatch<SetStateAction<boolean>>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const useModal = ({ cbBeforeOpen }: IUseModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [disableClose, setDisableClose] = useState(false);

  const handleOpenModal = () => {
    if (cbBeforeOpen) {
      cbBeforeOpen();
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (disableClose) {
      return;
    }

    setOpenModal(false);
  };

  return {
    openModal,
    disableClose,
    setDisableClose,
    handleOpenModal,
    handleCloseModal,
  } satisfies IUseModalReturnType;
};
