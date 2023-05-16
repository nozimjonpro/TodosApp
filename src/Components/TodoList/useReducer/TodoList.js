import React, { useReducer } from "react";

const initialState = {
  todos: [
    { id: 1, todo: "Wake up", isCompleted: false },
    { id: 2, todo: "Brush teeth", isCompleted: false },
    { id: 3, todo: "Have a breakfast", isCompleted: false },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };

    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const { todoName } = e.target.elements;

    const newTodo = {
      id: state.todos.length ? state.todos.at(-1).id + 1 : 0,
      todo: todoName.value,
      isCompleted: false,
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });

    todoName.value = null;
  };

  const handleUpdateTodo = (id, newName) => {
    const updatedTask = {
      id,
      todo: newName,
      isCompleted: false,
    };
    dispatch({ type: "UPDATE_TODO", payload: updatedTask });
  };

  const handleTodoDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleComplete = (id, isDone) => {
    let updatedTodo = state.todos.find((i) => i.id === id);
    updatedTodo.isCompleted = isDone;
    dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-50 flex-col ">
      <form className="mb-10" onSubmit={handleAddTodo}>
        <h1 className="text-center text-4xl mb-10 text-[#3cc]">Todos</h1>
        <input
          className="w-80 p-4 rounded-lg focus:border focus:border-[#3cc] border-none outline-none shadow-xl focus:shadow-2xl"
          type="text"
          placeholder="todos..."
          style={{ border: "1px solid #3cc" }}
          name="todoName"
        />
      </form>
      <ul className="w-80">
        {state.todos.map((i) => (
          <li
            className="mb-3 flex items-center w-full justify-between"
            key={i.id}
          >
            <input
              type="checkbox"
              onChange={(e) => handleComplete(i.id, e.target.checked)}
            />{" "}
            <span className={`${i.isCompleted ? "line-through" : ""}`}>
              {i.todo}
            </span>
            <div>
              <button
                className=" bg-slate-500 text-white p-1 rounded-md"
                onClick={() => handleTodoDelete(i.id)}
              >
                del
              </button>{" "}
              <button
                className="bg-slate-500 text-white p-1 rounded-md"
                onClick={() => handleUpdateTodo(i.id, "Updated")}
              >
                edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { TodoList };
