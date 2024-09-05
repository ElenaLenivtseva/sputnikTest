import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../features/todosSlice";
import {
  MyContainer,
  MyForm,
  MyButton,
  MyError,
} from "./Styles";
import Label from "../Label/Label";
import {AppDispatch} from '../../features/store'

interface IForm {
  id?: string,
  title: string,
  descr: string,
  completed: boolean,
  favorite: boolean,
}
const initialForm: IForm = {
  title: "",
  descr: "",
  completed: false,
  favorite: false,
};

const Form = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.title !== "") {
        dispatch(addTodoAsync(form));
        setForm(initialForm);
        setError("");
    } else {
        setError("Заголовок задачи не должен быть пустым! Описание опционально.");
    }
}

  return (
    <MyContainer>
      <MyForm onSubmit={handleSubmit}>
        <Label
          title="Заголовок задачи"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Label
          title="Описание задачи"
          value={form.descr}
          onChange={(e) => setForm({ ...form, descr: e.target.value })}
        />

        <MyButton>Добавить</MyButton>
        {error && <MyError>{error}</MyError>}
      </MyForm>
    </MyContainer>
  );
};

export default Form;
