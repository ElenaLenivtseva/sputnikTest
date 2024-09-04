import React from "react";
import styled from 'styled-components'


const MyButton = styled.button`
  background-color: #135fb4;
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-right: 1rem;
  font-size: 1.2rem;
`

const Button = ({ item, switchType }) => {
  return (
    <MyButton
      onClick={() => {
        switchType(item.type);
      }}
    >
      {item.title}
    </MyButton>
  );
};

export default Button;
