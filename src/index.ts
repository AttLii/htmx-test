import express from "express";
import bodyParser from "body-parser";
import { composeForm, composeTodoList, composeTodoListItem } from "./compose";
import { buildSanitizer, makeid } from "./utils";
import { Todo } from "./types";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const sanitizer = buildSanitizer({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
});

const todos: Todo[] = [];

app.get("/", (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.4"
          integrity="sha384-zUfuhFKKZCbHTY6aRR46gxiqszMk5tcHjsVFxnUo8VMus4kHGVdIYVbOYYNlKmHV"
          crossorigin="anonymous"
        ></script>
        <title>htmx</title>
      </head>
      <body>
        ${composeForm()}
        ${composeTodoList(todos)}
      </body>
    </html>
  `);
});

app.post("/api/todo", (req, res) => {
  const todo = {
    id: makeid(10),
    title: sanitizer(req.body.todo),
  };
  todos.push(todo);
  res.send(composeTodoListItem(todo));
});

app.delete("/api/todo/:id", (req, res) => {
  const index = todos.findIndex((todo) => todo.id === req.params.id);

  if (index !== -1) {
    todos.splice(index, 1);
  }

  res.send("");
});

app.listen(8000, () => console.log("http://localhost:8000"));
