import React from "react";
import { deleteTodoAsync } from "../../features/todosSlice";
import "./Modal.css";
import { useDispatch } from "react-redux";

const Modal = ({ modalIsOpen, itemId, closeModal }) => {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteTodoAsync(itemId));
    closeModal();
  }

  return (
    <div
      className={`modal ${modalIsOpen ? "modal__show" : ""}`}
      onClick={closeModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">Вы хотите удалить задачу?</div>
        </div>
        <div className="modal__body">
          <button className='modal__button modal__button--confirm' onClick={handleDelete}>Да</button>
          <button className='modal__button modal__button--cancel' onClick={closeModal}>Нет</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
