import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearTodos,
  getAllTodosLimitedAsync,
  getFiltredTodosAsync,
} from "../../features/todosSlice";
import TodoItem from "../TodoItem/TodoItem";
import { useInView } from "react-intersection-observer";
import Filter from "../Filter/Filter";
import {MyMessage} from './Styles'
import Modal from '../Modal/Modal'
import { Item } from "../TodoItem/TodoItem";


export type TypeStatus = "all" | "completed" | "uncompleted" | "favorite";
   
const Todolist: React.FC = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState<TypeStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // const todos = useSelector((state) => state.todos.todos);
  // const pages = useSelector((state) => state.todos.totalPages);
  // const loading = useSelector((state) => state.todos.loading);
  const [first, setFirst] = useState(true);
  const [itemId, setItemId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() {
    setItemId('');
    setModalIsOpen(false);
  }

  // подгрузка следующей порции todos, когда объект, по которому мы понимаем, что список закончился, появился в зоне видимости
  useEffect(() => {
    // функция подгрузки следующих порций todos
    function loadMore() {
      if (currentPage < pages) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        console.log("nextPage", nextPage);
        switch (type) {
          case "uncompleted":
            // dispatch(
            //   getFiltredTodosAsync({
            //     page: nextPage,
            //     type: "completed",
            //     status: false,
            //   })
            // );
            break;
          case "completed":
            // dispatch(
            //   getFiltredTodosAsync({
            //     page: nextPage,
            //     type: "completed",
            //     status: true,
            //   })
            // );
            break;
          case "favorite":
            // dispatch(
            //   getFiltredTodosAsync({
            //     page: nextPage,
            //     type: "favorite",
            //     status: true,
            //   })
            // );
            break;
          default:
            // dispatch(getAllTodosLimitedAsync(nextPage));
        }
      }
    }
    if (inView) {
      loadMore();
    }
  }, [inView]);

  // функция фильтрации
  function switchType(type:TypeStatus) {
    // dispatch(clearTodos());
    setFirst(false);
    setCurrentPage(1);
    setType(type);
    switch (type) {
      case "all":
        // dispatch(getAllTodosLimitedAsync(1));
        break;
      case "completed":
        // dispatch(
        //   getFiltredTodosAsync({ page: 1, type: "completed", status: true })
        // );
        break;
      case "uncompleted":
        // dispatch(
        //   getFiltredTodosAsync({ page: 1, type: "completed", status: false })
        // );
        break;
      case "favorite":
        // dispatch(
        //   getFiltredTodosAsync({ page: 1, type: "favorite", status: true })
        // );
        break;
    }
  }

  return (
    <div>
      <Filter switchType={switchType} />
      <div>
        <div>
          {/* {todos.map((item:Item) => {
            return <TodoItem key={item.id} item={item} setItemId={setItemId}
            setModalIsOpen={setModalIsOpen}/>;
          })} */}
        </div>
        {first && (
          <MyMessage>
            <p>Выберете категорию для начала работы</p>
          </MyMessage>
        )}
        {/* {loading && !first && (
          <MyMessage>
            <p>Загрузка...</p>
          </MyMessage>
        )}
        {!loading && !first && <div ref={ref} style={{ height: "20px" }}></div>} */}
      </div>
      <Modal modalIsOpen={modalIsOpen} itemId={itemId} closeModal={closeModal}/>
    </div>
  );
};

export default Todolist;
