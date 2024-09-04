import React from "react";

const Button = ({ item, switchType }) => {
  return (
    <button
      onClick={() => {
        switchType(item.type);
      }}
    >
      {item.title}
    </button>
  );
};

export default Button;
