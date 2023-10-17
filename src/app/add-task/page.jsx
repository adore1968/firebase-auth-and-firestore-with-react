"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function AddTaskPage({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { createTask, getTask, updateTask } = useAppContext();

  const { id } = params;

  const onSubmit = handleSubmit((data) => {
    if (id) updateTask(id, data);
    else createTask(data);
  });

  useEffect(() => {
    if (id) {
      getTask(id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description);
      });
    }
  }, []);

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-76px)]">
      <div className="flex-auto max-w-md">
        <form
          className="flex flex-col gap-5 p-5 bg-gray-800 rounded"
          onSubmit={onSubmit}
        >
          <div className="text-center">
            <h2 className="sm:text-3xl text-2xl font-bold">
              {id ? "Update Task" : "Create Task"}
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="sm:text-2xl text-xl font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="The title for the task"
              className="sm:text-xl py-2 px-2.5 text-lg text-gray-200 bg-transparent border border-opacity-50 rounded border-gray-50"
              {...register("title", {
                required: {
                  value: true,
                  message: "The title is required!",
                },
              })}
            />
            {errors.title && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="sm:text-2xl text-xl font-medium"
            >
              Description
            </label>
            <textarea
              id="password"
              placeholder="The description for the task"
              className="sm:text-xl py-2 px-2.5 text-lg text-gray-200 bg-transparent border border-opacity-50 rounded border-gray-50 resize-none"
              rows="3"
              {...register("description", {
                required: {
                  value: true,
                  message: "The description is required!",
                },
              })}
            />
            {errors.description && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`sm:text-xl w-full px-4 py-2 text-lg text-center transition-colors ease-in  rounded ${
                id
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-blue-700 hover:bg-blue-600"
              }`}
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddTaskPage;
