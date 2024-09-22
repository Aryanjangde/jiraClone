"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import { User, Calendar, Folder, CheckSquare } from 'lucide-react'
import Image from 'next/image'
import { useProjectData } from '@/context/Context';
import ChatBox from "../../../components/Chatbox";

const priorityColors = {
  LOW: 'border-green-500',
  MEDIUM: 'border-yellow-500',
  HIGH: 'border-red-500',
  CRITICAL: 'border-red-600'
}

const TaskDetails = ({ task, projectName }) => {
  const assignees = task.assignees.map((assignee) => assignee.name).join(', ');

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${priorityColors[task.priority]} border-l-4`}>
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Folder className="mr-2 text-blue-500" />
          <span>Project: {projectName}</span>
        </div>
        <div className="flex items-center">
          <User className="mr-2 text-blue-500" />
          <span>Assigned to: {assignees}</span>
        </div>
        <div className="flex items-center">
          <CheckSquare className="mr-2 text-blue-500" />
          <span>Status: {task.status}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 text-blue-500" />
          <span>Priority: {task.priority[0] + task.priority.slice(1).toLowerCase()}</span>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Screenshot</h3>
        <Image
          src={task.screenshot || `/placeholder.svg`}
          alt="Task Screenshot"
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

const TaskContent = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  const [task, setTask] = useState(null);
  const { projectDetails, setNavbarState } = useProjectData();

  useEffect(() => {
    async function getTaskData() {
      try {
        setNavbarState(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${taskId}`);
        const json = await res.json();
        setTask(json.data);
      } catch (error) {
        console.log("Error fetching task data:", error);
      }
    }

    if (taskId) {
      getTaskData();
    }
  }, [taskId, setNavbarState]);

  if (!task) return <div>Loading...</div>;

  const projectName = projectDetails[task.projectId - 1]?.projectName || 'Unknown Project';

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-[65%]">
        <TaskDetails task={task} projectName={projectName} />
      </div>
      <div className="lg:w-[35%]">
        <ChatBox />
      </div>
    </div>
  );
}

const TaskPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <TaskContent />
      </Suspense>
    </div>
  );
}

export default TaskPage;