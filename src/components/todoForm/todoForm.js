import React, { useState } from "react";
import "./todoForm.css";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        name="title"
        value={value}
        placeholder="Add What To Do"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
