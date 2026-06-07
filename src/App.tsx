import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editID, setEditID] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput("");
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function editTask(todo: Todo) {
    setEditID(todo.id);
    setEditText(todo.text);
  }

  function saveEdit() {
    setTodos(
      todos.map((todo) =>
        todo.id === editID
          ? { ...todo, text: editText }
          : todo
      )
    );

    setEditID(null);
    setEditText("");
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-10 px-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🌿 Todo App
      </h1>

      {/* INPUT SECTION */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none"
          placeholder="Add new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={addTodo}
          className="px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition"
        >
          Add
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mt-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as Filter)}
            className={`px-3 py-1 rounded-lg border transition
            ${
              filter === f
                ? "bg-emerald-500 text-black"
                : "border-slate-700 text-slate-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* EDIT MODE */}
      {editID !== null && (
        <div className="flex gap-2 mt-4 w-full max-w-md">
          <input
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button
            onClick={saveEdit}
            className="px-4 py-3 rounded-xl bg-emerald-500 text-black"
          >
            Save
          </button>
        </div>
      )}

      {/* TODO LIST */}
      <ul className="w-full max-w-md mt-6 space-y-3">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;