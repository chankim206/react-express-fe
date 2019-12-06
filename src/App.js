import React, { useState, useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import Todo from "./components/todo/todo";
import TodoForm from "./components/todoForm/todoForm";
import Pagination from "./components/pagination/pagination";
import "./App.css";

function Header({ page }) {
  return (
    <header>
      <h1> To Do List with React Hooks </h1>
      <h2> Current page: {page} </h2>
    </header>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await httpData("/todos", null, "GET");
      setTodos(response);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  async function httpData(url = "", data = {}, method) {
    // Default options are marked with *
    let response;
    if (data) {
      response = await fetch(url, {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    } else {
      response = await fetch(url, {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-referrer"
      });
    }

    return await response.json();
  }

  const addTodo = async title => {
    const response = await httpData(
      "/todos",
      { title, isCompleted: false },
      "POST"
    );
    const newTodos = [...todos, response];
    setTodos(newTodos);
  };

  const completeTodo = async (key, index) => {
    await httpData(
      `/todos/${key}`,
      { isCompleted: !todos[index].isCompleted },
      "PATCH"
    );
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = async key => {
    const response = await httpData(`/todos/${key}`, null, "DELETE");
    console.log(response);
    const newTodos = [...todos.filter(todo => key !== todo._id)];
    setTodos(newTodos);
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const items = currentTodos.map((todo, index) => (
    <Todo
      key={todo._id}
      index={index + indexOfFirstTodo}
      todo={todo}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  ));

  return (
    <div className="app">
      <Header page={currentPage} />
      <div className="todo-list">
        <Transition
          items={items}
          keys={item => item.key}
          from={{ opacity: 0, transform: "translate3d(100%,0,0)" }}
          enter={{ opacity: 1, transform: "translate3d(0%,0,0)" }}
          leave={{ display: "none" }}
          update={{ transform: "translate3d(0,0px,0)" }}
          trail={100}
        >
          {item => props => <div style={props}>{item}</div>}
        </Transition>
        <TodoForm addTodo={addTodo} />
      </div>
      <Pagination
        currentPage={currentPage}
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        changePage={setCurrentPage}
      />
    </div>
  );
}

export default App;
