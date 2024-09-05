import React from "react";
import { MyButton } from "./Styles";

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
