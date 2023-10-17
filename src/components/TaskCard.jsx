"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

function TaskCard({ task }) {
  const { deleteTask } = useAppContext();

  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-800 rounded">
      <div>
        <h3 className="sm:text-2xl text-xl font-medium">{task.title}</h3>
        <p className="sm:text-xl text-lg text-gray-200">{task.description}</p>
      </div>
      <div className="sm:text-xl flex gap-5 text-lg">
        <button
          type="button"
          className="hover:bg-red-600 px-4 py-2 transition-colors ease-in bg-red-700 rounded"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <Link
          href={`/update-task/${task.id}`}
          className="hover:bg-green-600 px-4 py-2 transition-colors ease-in bg-green-700 rounded"
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
