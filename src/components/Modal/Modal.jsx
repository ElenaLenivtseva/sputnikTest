import React from "react";
import { deleteTodoAsync } from "../../features/todosSlice";
import { useDispatch } from "react-redux";
import {
  MyModalBody,
  MyModalButton,
  MyModalTitle,
  MyModalHeader,
  MyModal,
  MyModalContent,
} from "./Styles";

const Modal = ({ modalIsOpen, itemId, closeModal }) => {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteTodoAsync(itemId));
    closeModal();
  }
  return (
    <MyModal
      visibility={modalIsOpen ? "visible" : "hidden"}
      opacity={modalIsOpen ? "1" : "0"}
      onClick={closeModal}
    >
    <MyModalContent
      visibility={modalIsOpen ? "visible" : "hidden"}
      opacity={modalIsOpen ? "1" : "0"}
      transform={modalIsOpen ? "translateY(0%)" : "translateY(-400%)"}
      onClick={(e) => e.stopPropagation()}
    >
        <MyModalHeader>
          <MyModalTitle>Вы хотите удалить задачу?</MyModalTitle>
        </MyModalHeader>
        <MyModalBody>
          <MyModalButton bg="#be2e2e" onClick={handleDelete}>
            Да
          </MyModalButton>
          <MyModalButton bg="#4ab320" onClick={closeModal}>
            Нет
          </MyModalButton>
        </MyModalBody>
      </MyModalContent>
    </MyModal>
  );
};

export default Modal;
