import React from "react";
import { MyLabel, MyInput } from "./Styles";

const Label = ({ title, value, onChange }) => {
  return (
    <MyLabel>
      {title}
      <MyInput type="text" value={value} onChange={onChange}></MyInput>
    </MyLabel>
  );
};

export default Label;
