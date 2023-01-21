const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Connect to the database
let db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='todos'",
  (err, row) => {
    if (err) {
      console.log(err);
    } else if (!row) {
      db.run(
        `CREATE TABLE todos (
          id INTEGER PRIMARY KEY,
          task TEXT NOT NULL,
          is_done BOOLEAN NOT NULL
          )`,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("table created");
          }
        }
      );
    } else {
      console.log("table already exists, moving on...");
    }
  }
);

// GET request to retrieve the entire todo list
app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

// POST request to add a new todo item to the list
app.post("/todos", (req, res) => {
  let newTodo = req.body;
  db.run(
    "INSERT INTO todos (task, is_done) VALUES (?,?)",
    [newTodo.task, newTodo.is_done],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        newTodo.id = this.lastID;
        res.json(newTodo);
      }
    }
  );
});

// PUT request to update a todo item
app.put("/todos/:id", (req, res) => {
  let todoId = req.params.id;
  let updatedTodo = req.body;
  db.run(
    "UPDATE todos SET task = ?, is_done = ? WHERE id = ?",
    [updatedTodo.task, updatedTodo.is_done, todoId],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        updatedTodo.id = todoId;
        res.json(updatedTodo);
      }
    }
  );
});

// DELETE request to delete a todo item
app.delete("/todos/:id", (req, res) => {
  let todoId = req.params.id;
  db.run("DELETE FROM todos WHERE id = ?", todoId, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: todoId });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
