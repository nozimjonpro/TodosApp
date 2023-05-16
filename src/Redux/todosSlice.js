import { createSlice } from "@reduxjs/toolkit";

const data = [
  { id: 1, todo: "Wake up", isCompleted: false },
  { id: 2, todo: "Brush teeth", isCompleted: false },
  { id: 3, todo: "Have a breakfast", isCompleted: false },
];

const todosSlice = createSlice({
  name: "todos",
  initialState: [...data],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateTodo: (state, action) => {
      state.map((i) => {
        if (i.id === action.payload.id) {
          i.todo = action.payload.title;
        }
      });
    },

    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    completeTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
});

export const { addTodo, updateTodo, completeTodo, deleteTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
