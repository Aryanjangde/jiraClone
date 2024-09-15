"use client"
import { useEffect, useState } from 'react';
import TaskCard from './TaskCard.js'; // Make sure to import TaskCard from the correct path

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3
};

const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.title !== b.title) {
      return a.title.localeCompare(b.title);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};

const fetchTasks = async (status) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${status}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks for ${status}`);
  }
  return res.json();
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const [todoTasks, inProgressTasks, doneTasks] = await Promise.all([
          fetchTasks('todo'),
          fetchTasks('inProgress'),
          fetchTasks('done')
        ]);
        
        setTasks({
          todo: sortTasks(todoTasks),
          inProgress: sortTasks(inProgressTasks),
          done: sortTasks(doneTasks)
        });
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 h-screen ">
      <div className="flex flex-col md:flex-row gap-6 h-full shadow-2xl">
        {[
          { title: "TODO", tasks: tasks.todo },
          { title: "IN-PROGRESS", tasks: tasks.inProgress },
          { title: "DONE", tasks: tasks.done }
        ].map((section, index) => (
          <div key={section.title} className="flex-1 bg-white p-6 rounded-lg shadow-xl border border-blue-200 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-blue-800 pb-2 border-b border-blue-200">{section.title}</h2>
            <div className="overflow-y-auto flex-grow">
              {section.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
