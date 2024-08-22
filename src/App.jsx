import { useState } from "react";

export default function App() {
  const [task, setTask] = useState([
    { id: 1, title: "Learn React", complete: false },
    { id: 2, title: "Learn Tailwind", complete: false },
    { id: 3, title: "Learn Vite Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia repudiandae, ab tempore asperiores aut cumque quas ipsa ullam accusantium placeat minus ducimus quidem voluptate animi quam eaque quod ipsam eius.", complete: false },
  ]);

  const [title, setTitle] = useState("");

  const addNewTask = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTask = {
      id: task.length + 1,
      title: title,
      complete: false,
    };

    setTask([...task, newTask]);
    setTitle("");
  };

  const deleteTask = (id) => {
    const newTaskList = task.filter((item) => item.id !== id);
    setTask(newTaskList);
  };

  const toggleTaskComplete = (id) => {
    const newTaskList = task.map((item) =>
      item.id === id ? { ...item, complete: !item.complete } : item
    );
    setTask(newTaskList);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">To Do List</h1>
      <form
        onSubmit={addNewTask}
        className="gap-2 border border-blue-200 bg-blue-50 p-4 rounded grid md:flex w-full"
      >
        <input
          value={title}
          type="text"
          name="task"
          onChange={(e) => setTitle(e.target.value)}
          className="md:flex-1 border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Create your task"
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white md:w-fit"
        >
          Add Task
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold">{task.length} Tasks</h3>

        {task.map((item) => (
          <div
            key={item.id}
            className="bg-white border p-2 my-2 rounded flex justify-between items-center w-full mx-auto"
          >
            <span
              className={item.complete ? "line-through" : ""}
              onClick={() => toggleTaskComplete(item.id)}
            >
              {item.title}
            </span>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  deleteTask(item.id);
                }
              }}
              className="text-red-500 border border-red-500 p-2 self-start rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
