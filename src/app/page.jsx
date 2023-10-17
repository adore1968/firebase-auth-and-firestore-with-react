"use client";

import TaskCard from "@/components/TaskCard";
import { useAppContext } from "@/context/AppContext";

function HomePage() {
  const { tasks } = useAppContext();

  return (
    <section className="mt-12">
      <div className="lg:grid-cols-3 sm:grid-cols-2 grid grid-cols-1 gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
