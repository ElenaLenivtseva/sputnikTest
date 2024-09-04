import React from "react";
import Button from "../Button/Button";
import styled from "styled-components";

const MyFilter = styled.div`
  background: #bcf1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  position: sticky;
  top: 0;
`;

const buttons = [
  { title: "Все", type: "all" },
  { title: "Выполненные", type: "completed" },
  { title: "Невыполненные", type: "uncompleted" },
  { title: "Избранные", type: "favorite" },
];

const Filter = ({ switchType }) => {
  return (
    <MyFilter>
      {buttons.map((item, index) => {
        return <Button item={item} key={index} switchType={switchType} />;
      })}
    </MyFilter>
  );
};

export default Filter;
