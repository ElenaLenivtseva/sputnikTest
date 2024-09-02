import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodosAsync, getFavoriteTodosAsync, getFiltredTodosByStatusAsync} from '../../features/todosSlice'
import TodoItem from '../TodoItem/TodoItem';

const Todolist = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  
  useEffect(() => {
    dispatch(getAllTodosAsync());
  }, [dispatch]);
  
  return (
    <div>
      <button onClick={()=>dispatch(getAllTodosAsync())}>Все</button>
      <button onClick={()=>dispatch(getFiltredTodosByStatusAsync(true))}>Выполненные</button>
      <button onClick={()=>dispatch(getFiltredTodosByStatusAsync(false))}>Невыполненные</button>
      <button onClick={()=>dispatch(getFavoriteTodosAsync())}>Избранные</button>
    <div>
      {todos.map((item)=>{
        return (
          <TodoItem key={item.id} item={item}/>
        )
      })}
    </div>
    </div>
  )
}

export default Todolist
