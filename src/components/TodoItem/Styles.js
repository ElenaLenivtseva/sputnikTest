import styled from "styled-components";

export const MyTodo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #135fb4;
  padding: 1.5rem;
`;

export const MyActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const MyLike = styled.svg`
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`;

export const MyTodoButton = styled.button`
  background-color: #135fb4;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

export const MyCheckbox = styled.input`
  margin-right: 0.5rem;
  width: 1rem;
`;

export const MyTodoTitle = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.color || "black"};
  text-decoration: ${(props) => props.line || "none"};
`;

export const MyTodoDescr = styled.p`
  color: ${(props) => props.color || "black"};
  text-decoration: ${(props) => props.line || "none"};
`;