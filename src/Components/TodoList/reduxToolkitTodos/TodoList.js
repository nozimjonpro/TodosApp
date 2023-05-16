import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
} from "../../../Redux/todosSlice";

function TodoList() {
  const data = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    const { todoName } = e.target.elements;

    let newTodo = {
      id: data.length ? data.at(-1).id + 1 : 0,
      todo: todoName.value,
      isCompleted: false,
    };

    dispatch(addTodo(newTodo));

    todoName.value = null;
  };

  const handleTodoDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, title) => {
    dispatch(updateTodo({ id, title }));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-50 flex-col">
      <form className="mb-10" onSubmit={handleAddTodo}>
        <h1 className="text-center text-4xl mb-10 text-[#3cc]">Todos...</h1>
        <input
          className="w-80 p-4 rounded-lg focus:border focus:border-[#3cc] border-none outline-none shadow-xl focus:shadow-2xl"
          type="text"
          placeholder="todos..."
          style={{ border: "1px solid #3cc" }}
          name="todoName"
        />
      </form>
      <ul className="w-80">
        {data.map((i) => (
          <li
            className="mb-3 flex items-center w-full justify-between"
            key={i.id}
          >
            <input type="checkbox" onChange={(e) => handleComplete(i.id)} />{" "}
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
