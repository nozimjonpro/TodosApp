import React from "react";
import { TodoList as UseReducerTodos } from "./Components/TodoList/useReducer/TodoList";
import { TodoList as UseStateTodos } from "./Components/TodoList/useState/TodoList";
import { TodoList as ReduxToolkitTodos } from "./Components/TodoList/reduxToolkitTodos/TodoList";

function App() {
  return <ReduxToolkitTodos></ReduxToolkitTodos>;
}

export default App;
