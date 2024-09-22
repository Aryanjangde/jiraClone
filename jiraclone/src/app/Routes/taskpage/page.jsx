"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { User, Calendar, Folder, CheckSquare, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import { useProjectData } from '@/context/Context';

const priorityColors = {
  LOW: 'border-green-500',
  MEDIUM: 'border-yellow-500',
  HIGH: 'border-red-500',
  CRITICAL: 'border-red-600'
}

const TaskDetails = ({ task }) => {
  const assignees = task.assignees.map((assignee) => assignee.name).join(', ');
  const { projectDetails } = useProjectData();
  console.log(projectDetails, "projectDetails")
  const projectId = task.projectId
  const projectName = projectDetails[projectId-1].projectName
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

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 mb-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100'} rounded-lg`}>
            <p className="text-sm">{msg}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <MessageSquare />
          </button>
        </div>
      </div>
    </div>
  );
}

const TaskPage = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  const [task, setTask] = useState(null); 

  useEffect(() => {
    async function getTaskData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${taskId}`);
        const json = await res.json();
        setTask(json.data); // Directly store the task object
      } catch (error) {
        console.log("Error fetching task data:", error);
      }
    }

    if (taskId) {
      getTaskData();
    }
  }, [taskId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[65%]">
          {task ? <TaskDetails task={task} /> : 'Loading...'} 
          {console.log(task)}
        </div>
        <div className="lg:w-[35%]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
