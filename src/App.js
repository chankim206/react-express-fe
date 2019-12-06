import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Posts from "./components/posts/post";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to React</p>
      </header>
      <Posts />
    </div>
  );
}

export default App;
