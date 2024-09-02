import React from "react";
import { useDispatch } from "react-redux";
import {
  changeStatusTodoAsync,
  deleteTodoAsync,
} from "../../features/todosSlice";

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  
  function handleChangeFav(item) {
    const reverse = !item.favorite;
    const obj = {
      id: item.id,
      title: item.title,
      descr: item.descr,
      completed: item.completed,
      favorite: reverse,
    };

    dispatch(changeStatusTodoAsync(obj));
  }

  function handleDelete() {
    dispatch(deleteTodoAsync(item.id));
  }

  function handleStatusChange(item) {
    const reverse = !item.completed;

    const obj = {
      id: item.id,
      title: item.title,
      descr: item.descr,
      favorite: item.favorite,
      completed: reverse,
    };
    dispatch(changeStatusTodoAsync(obj));
  }
  return (
    <div>
      <p>{item.title}</p>
      <p>{item.desc}</p>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleStatusChange(item)}
      />
      <div>
        {item.favorite ? (
          <button onClick={() => handleChangeFav(item)}>
            Убрать из избранного
          </button>
        ) : (
          <button onClick={() => handleChangeFav(item)}>
            Добавить в избранное
          </button>
        )}
      </div>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default TodoItem;
