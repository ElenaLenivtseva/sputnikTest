import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearTodos,
  getAllTodosLimitedAsync,
  getFiltredTodosAsync,
} from "../../features/todosSlice";
import TodoItem from "../TodoItem/TodoItem";
import { useInView } from "react-intersection-observer";
import Filter from "../Filter/Filter";



const Todolist = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // all, favorite, completed, uncompleted

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const todos = useSelector((state) => state.todos.todos);
  const pages = useSelector((state) => state.todos.totalPages);
  const loading = useSelector((state) => state.todos.loading);

  // первичная отрисовка todos
  useEffect(() => {
    switchType("all");
  }, []);

  // функция подгрузки следующих порций todos
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
  // подгрузка следующей порции todos, когда объект, по которому мы понимаем, что список закончился, появился в зоне видимости
  useEffect(() => {
    
    if (inView) {
      loadMore();
    }
  }, [inView]);

  // функция фильтрации
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

  return (
    <div>
      <Filter switchType={switchType} />
      <div>
        <div>
          {todos.map((item) => {
            return <TodoItem key={item.id} item={item} />;
          })}
        </div>
        {loading ? (
          <p>Загрузка</p>
        ) : (
          <div ref={ref} style={{ height: "20px" }}></div>
        )}
      </div>
    </div>
  );
};

export default Todolist;
