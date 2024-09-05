import React from "react";
import Button from "../Button/Button";
import { MyFilter } from "./Styles";

const buttons = [
  { title: "Все", type: "all" },
  { title: "Выполненные", type: "completed" },
  { title: "Невыполненные", type: "uncompleted" },
  { title: "Избранные", type: "favorite" },
];

interface FilterProps {
  switchType: (type: string)=>void;
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
