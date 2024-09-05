import React from "react";
import { MyLabel, MyInput } from "./Styles";

interface LabelProps {
  title: string;
  value: string;
  onChange: ()=> void;
}

const Label: React.FC<LabelProps> = ({ title, value, onChange }) => {
  return (
    <MyLabel>
      {title}
      <MyInput type="text" value={value} onChange={onChange}></MyInput>
    </MyLabel>
  );
};


export default Label;
