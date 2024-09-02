import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addTodoAsync} from '../../features/todosSlice'

const initialForm = {
  title: "",
  descr: "",
  completed: false,
  favorite: false,
};
const Form = () => {
  const [form, setForm] = useState(initialForm);
  const [error,setError]=useState('')
  const dispatch = useDispatch()
  function handleSubmit(e){
    e.preventDefault()
    if(form.title!==""){
      dispatch(addTodoAsync(form))
      setForm(initialForm)
      setError('')
    } else {
      setError('Заголовок задачи не должен быть пустым. Описание опционально.')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Заголовок задачи
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label>
          Описание задачи
          <input
            type="text"
            value={form.descr}
            onChange={(e) => setForm({ ...form, descr: e.target.value })}
          />
        </label>
        <button>Добавить</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Form;
