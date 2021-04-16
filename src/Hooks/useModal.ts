import { useCallback, useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);

  const openModal = useCallback(() => {
    setShow(true);
  }, []);

  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  return { show, openModal, closeModal };
};

export default useModal;
