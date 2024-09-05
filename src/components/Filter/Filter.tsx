import React from "react";
import Button from "../Button/Button";
import { MyFilter } from "./Styles";
import { TypeStatus } from "../Todolist/Todolist";

interface Button {
  title: string;
  type: TypeStatus;
}

const buttons: Button[] = [
  { title: "Все", type: "all" },
  { title: "Выполненные", type: "completed" },
  { title: "Невыполненные", type: "uncompleted" },
  { title: "Избранные", type: "favorite" },
];


interface FilterProps {
  switchType: (type: TypeStatus)=>void;
}

const Filter: React.FC<FilterProps> = ({ switchType }) => {
  return (
    <MyFilter>
    {buttons.map((item, index) => {
      return <Button item={item} key={index} switchType={switchType} />;
    })}
  </MyFilter>
  );
};

export default Filter;
