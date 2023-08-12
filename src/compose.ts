import { Todo } from "./types";

export const composeForm = () => {
  return `
    <form hx-post="/api/todo" hx-swap="beforeend" hx-target="#todos">
      <input type="text" name="todo" />
      <button type="submit">Send</button>
    </form>
  `;
};

export const composeTodoList = (todos: Todo[]) => {
  let listItemsHTML = "";
  for (const todo of todos) {
    listItemsHTML += composeTodoListItem(todo);
  }
  return `
    <ul id="todos" hx-get="/api/todo" hx-trigger="load">
      ${listItemsHTML}
    </ul>
  `;
};

export const composeTodoListItem = (todo: Todo) => {
  return `
    <li id="${todo.id}">
      <p>${todo.title}</p>
      <button hx-trigger="click" hx-delete="/api/todo/${todo.id}" hx-target="#${todo.id}" hx-swap="delete">x</button>
    </li>
  `;
};
