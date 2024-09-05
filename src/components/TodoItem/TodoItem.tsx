import React from "react";
import { useDispatch } from "react-redux";
import {
  changeStatusTodoAsync,
} from "../../features/todosSlice";
import {
  MyTodo,
  MyActions,
  MyLike,
  MyTodoButton,
  MyCheckbox,
  MyTodoTitle,
  MyTodoDescr,
} from "./Styles";

export interface Item {
  id: string,
    title: string,
    descr: string,
    completed: boolean,
    favorite: boolean,
}
interface TodoItemProps {
  item: Item;
  setItemId: (type: string)=>void;
  setModalIsOpen: (type: boolean)=>void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, setItemId, setModalIsOpen }) => {
  const dispatch = useDispatch();

  function handleChangeFav(item: Item) {
    const reverse = !item.favorite;
    const obj: Item = {
      id: item.id,
      title: item.title,
      descr: item.descr,
      completed: item.completed,
      favorite: reverse,
    };

    // dispatch(changeStatusTodoAsync(obj));
  }

  function handleStatusChange(item: Item) {
    const reverse = !item.completed;

    const obj: Item = {
      id: item.id,
      title: item.title,
      descr: item.descr,
      favorite: item.favorite,
      completed: reverse,
    };
    // dispatch(changeStatusTodoAsync(obj));
  }
  return (
    <MyTodo>
      <MyActions>
        <MyTodoButton
          onClick={() => {
            setModalIsOpen(true);
            setItemId(item.id);
          }}
        >
          Удалить
        </MyTodoButton>
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
        {item.completed ? (
          <MyTodoTitle color="#97989b" line="line-through">
            {item.title}
          </MyTodoTitle>
        ) : (
          <MyTodoTitle>{item.title}</MyTodoTitle>
        )}

        <MyCheckbox
          type="checkbox"
          checked={item.completed}
          onChange={() => handleStatusChange(item)}
        ></MyCheckbox>
      </MyActions>
      <div>
        {item.completed ? (
          <MyTodoDescr color="#97989b" line="line-through">
            {item.descr}
          </MyTodoDescr>
        ) : (
          <MyTodoDescr>{item.descr}</MyTodoDescr>
        )}
      </div>
    </MyTodo>
  );
};

// const TodoItem = ({ item, setItemId, setModalIsOpen }) => {
//   const dispatch = useDispatch();

//   function handleChangeFav(item) {
//     const reverse = !item.favorite;
//     const obj = {
//       id: item.id,
//       title: item.title,
//       descr: item.descr,
//       completed: item.completed,
//       favorite: reverse,
//     };

//     dispatch(changeStatusTodoAsync(obj));
//   }

//   function handleStatusChange(item) {
//     const reverse = !item.completed;

//     const obj = {
//       id: item.id,
//       title: item.title,
//       descr: item.descr,
//       favorite: item.favorite,
//       completed: reverse,
//     };
//     dispatch(changeStatusTodoAsync(obj));
//   }
//   return (
//     <MyTodo>
//       <MyActions>
//         <MyTodoButton
//           onClick={() => {
//             setModalIsOpen(true);
//             setItemId(item.id);
//           }}
//         >
//           Удалить
//         </MyTodoButton>
//         <div>
//           {item.favorite ? (
//             <MyLike
//               onClick={() => handleChangeFav(item)}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="#135fb4"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="none"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//               />
//             </MyLike>
//           ) : (
//             <MyLike
//               onClick={() => handleChangeFav(item)}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="#135fb4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//               />
//             </MyLike>
//           )}
//         </div>
//       </MyActions>
//       <MyActions>
//         {item.completed ? (
//           <MyTodoTitle color="#97989b" line="line-through">
//             {item.title}
//           </MyTodoTitle>
//         ) : (
//           <MyTodoTitle>{item.title}</MyTodoTitle>
//         )}

//         <MyCheckbox
//           type="checkbox"
//           checked={item.completed}
//           onChange={() => handleStatusChange(item)}
//         ></MyCheckbox>
//       </MyActions>
//       <div>
//         {item.completed ? (
//           <MyTodoDescr color="#97989b" line="line-through">
//             {item.descr}
//           </MyTodoDescr>
//         ) : (
//           <MyTodoDescr>{item.descr}</MyTodoDescr>
//         )}
//       </div>
//     </MyTodo>
//   );
// };

export default TodoItem;
