import React from "react";
import "./todo.css";

function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.title}
      <div>
        <button className="btn" onClick={() => completeTodo(todo._id, index)}>
          {" "}
          Done{" "}
        </button>
        <button className="btn" onClick={() => deleteTodo(todo._id)}>
          {" "}
          X{" "}
        </button>
      </div>
    </div>
  );
}

export default Todo;
