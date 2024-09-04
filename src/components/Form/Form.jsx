import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../features/todosSlice";
import styled from "styled-components";

const MyContainer = styled.div`
  padding: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  border-right: 1px solid #135fb4;
`;
const MyForm = styled.form`
  position: sticky;
  top: 30%;
`;
const MyLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;
const MyInput = styled.input`
  background: #bcf1f5;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1.7rem;
  width: 80%;
  font-size: 1.2rem;
`;
const MyButton = styled.button`
  background-color: #135fb4;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-right: 1rem;
  font-size: 1.2rem;
  width: 80%;
`;
const MyError = styled.div`
  background-color: #fcfcfc;
  font-weight: bold;
  color: #c01e1e;
  background: #fafafa;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-top: 1rem;
  width: 80%;
`;

const initialForm = {
  title: "",
  descr: "",
  completed: false,
  favorite: false,
};
const Form = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  function handleSubmit(e) {
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
        <MyLabel>
          Заголовок задачи
          <MyInput
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          ></MyInput>
        </MyLabel>
        <MyLabel>
          Описание задачи
          <MyInput
            type="text"
            value={form.descr}
            onChange={(e) => setForm({ ...form, descr: e.target.value })}
          ></MyInput>
        </MyLabel>
        <MyButton>Добавить</MyButton>
        {error && <MyError>{error}</MyError>}
      </MyForm>
      
    </MyContainer>
  );
};

export default Form;
