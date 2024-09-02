import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodosAsync} from '../../features/todosSlice'
import TodoItem from '../TodoItem/TodoItem';

const Todolist = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  
  useEffect(() => {
    dispatch(getAllTodosAsync());
  }, [dispatch]);
  
  return (
    <div>
      {todos.map((item)=>{
        return (
          <TodoItem key={item.id} item={item}/>
        )
      })}
    </div>
  )
}

export default Todolist
