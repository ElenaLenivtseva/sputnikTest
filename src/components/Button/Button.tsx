import React from "react";
import { MyButton } from "./Styles";
import { TypeStatus } from "../Todolist/Todolist";

interface ButtonProps {
  item:  { title: string, type: TypeStatus};
  switchType: (type: TypeStatus)=>void;
}

const Button: React.FC<ButtonProps> = ({ item, switchType }) => {
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
