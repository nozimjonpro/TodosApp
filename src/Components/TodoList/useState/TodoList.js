import React, { useState } from "react";

const todos = [
  { id: 1, todo: "Wake up", isCompleted: false },
  { id: 2, todo: "Brush teeth", isCompleted: false },
  { id: 3, todo: "Have a breakfast", isCompleted: false },
];

function TodoList() {
  const [data, setData] = useState(todos || []);
  const handleAddTodo = (e) => {
    e.preventDefault();
    const { todoName } = e.target.elements;
    let newTodo = {
      id: todos.length ? todos.at(-1).id + 1 : 0,
      todo: todoName.value,
      isCompleted: false,
    };
    setData([...data, newTodo]);
  };

  const handleTodoDelete = (id) => {
    setData([...data.filter((i) => i.id !== id)]);
  };

  const handleUpdateTodo = (id, title) => {
    setData([
      ...data.map((i) => {
        if (i.id === id) {
          i.todo = title;
        }
        return i;
      }),
    ]);
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
            <input
              type="checkbox"
              //   onChange={(e) => handleComplete(i.id, e.target.checked)}
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
