import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearTodos,
  getAllTodosLimitedAsync,
  getFiltredTodosAsync,
} from "../../features/todosSlice";
import TodoItem from "../TodoItem/TodoItem";
import { useInView } from "react-intersection-observer";

const buttons = [
  { title: "Все", type: "all" },
  { title: "Выполненные", type: "completed" },
  { title: "Невыполненные", type: "uncompleted" },
  { title: "Избранные", type: "favorite" },
];
const Todolist = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const pages = useSelector((state) => state.todos.totalPages);
  const loading = useSelector((state) => state.todos.loading);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // all, favorite, completed, uncompleted

  useEffect(() => {
    switchType("all");
  }, []);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  function switchType(type) {
    dispatch(clearTodos());
    setCurrentPage(1);
    setType(type);
    switch (type) {
      case "all":
        dispatch(getAllTodosLimitedAsync(1));
        break;
      case "completed":
        dispatch(
          getFiltredTodosAsync({ page: 1, type: "completed", status: true })
        );
        break;
      case "uncompleted":
        dispatch(
          getFiltredTodosAsync({ page: 1, type: "completed", status: false })
        );
        break;
      case "favorite":
        dispatch(
          getFiltredTodosAsync({ page: 1, type: "favorite", status: true })
        );
        break;
    }
  }
  function loadMore() {
    if (currentPage < pages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      console.log("nextPage", nextPage);
      switch (type) {
        case "uncompleted":
          dispatch(
            getFiltredTodosAsync({
              page: nextPage,
              type: "completed",
              status: false,
            })
          );
          break;
        case "completed":
          dispatch(
            getFiltredTodosAsync({
              page: nextPage,
              type: "completed",
              status: true,
            })
          );
          break;
        case "favorite":
          dispatch(
            getFiltredTodosAsync({
              page: nextPage,
              type: "favorite",
              status: true,
            })
          );
          break;
        default:
          dispatch(getAllTodosLimitedAsync(nextPage));
      }
    }
  }

  return (
    <div>
      {buttons.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              switchType(item.type);
            }}
          >
            {item.title}
          </button>
        );
      })}
      <div>
        {todos.map((item) => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </div>
      {loading && <p>Загрузка</p>}
      {!loading && (
        <p onClick={loadMore} ref={ref} style={{ height: "50px" }}></p>
      )}
    </div>
  );
};

export default Todolist;
