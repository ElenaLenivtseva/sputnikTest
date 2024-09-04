import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearTodos,
  getAllTodosLimitedAsync,
  getFiltredTodosAsync,
} from "../../features/todosSlice";
import TodoItem from "../TodoItem/TodoItem";
import { useInView } from "react-intersection-observer";

const Todolist = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const pages = useSelector((state) => state.todos.totalPages);
  const loading = useSelector((state) => state.todos.loading);
  const [type, setType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // all, favorite, completed, uncompleted

  
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

      if (type === "uncompleted") {
        dispatch(
          getFiltredTodosAsync({
            page: nextPage,
            type: "completed",
            status: false,
          })
        );
      }
      if (type === "completed") {
        dispatch(
          getFiltredTodosAsync({
            page: nextPage,
            type: "completed",
            status: true,
          })
        );
      }
      if (type === "favorite") {
        dispatch(
          getFiltredTodosAsync({
            page: nextPage,
            type: "favorite",
            status: true,
          })
        );
      }
      if (type === "all") {
        dispatch(getAllTodosLimitedAsync(nextPage));
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          switchType("all");
        }}
      >
        Все
      </button>
      <button
        onClick={() => {
          switchType("completed");
        }}
      >
        Выполненные
      </button>
      <button
        onClick={() => {
          switchType("uncompleted");
        }}
      >
        Невыполненные
      </button>
      <button
        onClick={() => {
          switchType("favorite");
        }}
      >
        Избранные
      </button>
      <div>
        {todos.map((item) => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </div>
      {loading && <p>Загрузка</p>}
      {!loading && <p onClick={loadMore} ref={ref}></p>}
    </div>
  );
};

export default Todolist;
