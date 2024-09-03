import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearTodos,
  getAllTodosLimitedAsync,
  getFiltredTodosAsync,
} from "../../features/todosSlice";
import TodoItem from "../TodoItem/TodoItem";

const Todolist = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const pages = useSelector((state) => state.todos.totalPages);
  const [type, setType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // all, favorite, completed, uncompleted

  useEffect(() => {
    dispatch(getAllTodosLimitedAsync(1));
  }, [dispatch]);
  useEffect(() => {
    setCurrentPage(1); 
    // clearTodos()
  }, [type]);

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
          setType("all");
          dispatch(getAllTodosLimitedAsync(1));
        }}
      >
        Все
      </button>
      <button
        onClick={() => {
          setType("completed");
          dispatch(
            getFiltredTodosAsync({ page: 1, type: "completed", status: true })
          );
        }}
      >
        Выполненные
      </button>
      <button
        onClick={() => {
          setType("uncompleted");
          dispatch(
            getFiltredTodosAsync({ page: 1, type: "completed", status: false })
          );
        }}
      >
        Невыполненные
      </button>
      <button
        onClick={() => {
          setType("favorite");
          dispatch(
            getFiltredTodosAsync({ page: 1, type: "favorite", status: true })
          );
        }}
      >
        Избранные
      </button>
      <div>
        {todos.map((item) => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </div>
      <button onClick={loadMore}>Загрузить еще</button>
      {/* {[...Array(pages)].map((item, index) => {
        return (
          <>
            {type === "all" && (
              <button
                key={index}
                onClick={() => dispatch(getAllTodosLimitedAsync(index + 1))}
              >
                {index + 1}
              </button>
            )}
            {type === "uncompleted" && (
              <button
                key={index}
                onClick={() =>
                  dispatch(
                    getFiltredTodosAsync({
                      page: index + 1,
                      type: "completed",
                      status: false,
                    })
                  )
                }
              >
                {index + 1}
              </button>
            )}
            {type === "completed" && (
              <button
                key={index}
                onClick={() =>
                  dispatch(
                    getFiltredTodosAsync({
                      page: index + 1,
                      type: "completed",
                      status: true,
                    })
                  )
                }
              >
                {index + 1}
              </button>
            )}
            {type === "favorite" && (
              <button
                key={index}
                onClick={() =>
                  dispatch(
                    getFiltredTodosAsync({
                      page: index + 1,
                      type: "favorite",
                      status: true,
                    })
                  )
                }
              >
                {index + 1}
              </button>
            )}
          </>
        );
      })} */}
    </div>
  );
};

export default Todolist;
