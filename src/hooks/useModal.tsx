import { useState } from "react";

interface IUseModal {
  cbBeforeOpen?: () => void;
}

export const useModal = ({ cbBeforeOpen }: IUseModal) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (cbBeforeOpen) {
      cbBeforeOpen();
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
