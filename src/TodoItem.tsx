type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTask: (todo: Todo) => void;
};

export default function TodoItem({
  todo,
  deleteTodo,
  toggleTodo,
  editTask,
}: Props) {
  return (
    <li
      className="group flex items-center justify-between gap-4
      p-4 rounded-2xl
      bg-slate-900/80 backdrop-blur-md
      border border-slate-800
      hover:border-emerald-500/60
      hover:shadow-lg hover:shadow-emerald-500/10
      transition-all duration-300"
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          onClick={() => toggleTodo(todo.id)}
          className={`w-5 h-5 flex items-center justify-center rounded-md cursor-pointer
          border transition
          ${
            todo.completed
              ? "bg-emerald-500 border-emerald-400"
              : "border-slate-600 group-hover:border-emerald-400"
          }`}
        >
          {todo.completed && (
            <span className="text-xs text-black font-bold">✓</span>
          )}
        </div>

        <span
          className={`text-sm md:text-base transition-all duration-300
          ${todo.completed ? "line-through text-slate-500" : "text-slate-100"}`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
        <button
          onClick={() => editTask(todo)}
          className="px-3 py-1.5 text-xs rounded-lg
          bg-emerald-500/10 text-emerald-300
          border border-emerald-500/30
          hover:bg-emerald-500/20 hover:scale-105
          transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1.5 text-xs rounded-lg
          bg-red-500/10 text-red-400
          border border-red-500/30
          hover:bg-red-500/20 hover:scale-105
          transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
