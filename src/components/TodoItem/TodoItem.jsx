import React from "react";
import { useDispatch } from "react-redux";
import {
  changeStatusTodoAsync,
  deleteTodoAsync,
} from "../../features/todosSlice";
import styled from "styled-components";

const MyTodo = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #135fb4; */
  border-bottom: 0.5px solid #135fb4;
  padding: 1.5rem;
`;
const MyActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const MyLike = styled.svg`
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;
const MyTodoButton = styled.button`
  background-color: #135fb4;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-right: 1rem;
  font-size: 1.2rem;
`;
const MyTodoTitle = styled.h4`
  font-size: 1.5rem;
`
const MyCheckbox = styled.input`
  margin-right: 0.5rem;
  width: 1rem;
`

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
    <MyTodo>
      <MyActions>
        <MyTodoButton onClick={handleDelete}>Удалить</MyTodoButton>
        <div>
          {item.favorite ? (
            <MyLike
              onClick={() => handleChangeFav(item)}
              xmlns="http://www.w3.org/2000/svg"
              fill="#135fb4"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </MyLike>
          ) : (
            <MyLike
              onClick={() => handleChangeFav(item)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#135fb4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </MyLike>
          )}
        </div>
      </MyActions>
      <MyActions>
        <MyTodoTitle>{item.title}</MyTodoTitle>
        <MyCheckbox
          type="checkbox"
          checked={item.completed}
          onChange={() => handleStatusChange(item)}
        ></MyCheckbox>
      </MyActions>
      <div>
        <p>{item.descr}</p>
      </div>
    </MyTodo>
  );
};

export default TodoItem;
