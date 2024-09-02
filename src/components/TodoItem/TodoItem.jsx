import React from "react";

const TodoItem = ({ item }) => {
  return (
    <div>
      <p>{item.title}</p>
      <p>{item.desc}</p>
      <input type="checkbox" checked={item.completed} />
      <div>
        {item.favorite ? (
          <button>Убрать из избранного</button>
        ) : (
          <button>Добавить в избранное</button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
