"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Calendar, Folder, CheckSquare } from "lucide-react";
import Image from "next/image";
import UpdateStatus from "../../../components/UpdateStatus";
import { useProjectData } from "@/context/Context";
import ChatBox from "../../../components/Chatbox";

const priorityColors = {
  LOW: "border-green-500",
  MEDIUM: "border-yellow-500",
  HIGH: "border-red-500",
  CRITICAL: "border-red-600",
};

const TaskDetails = ({ task, projectName, taskId }) => {
  const assignees = task.assignees.map((assignee) => assignee.name).join(", ");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { projectId, taskState, setTaskState} = useProjectData();


  const onClose = async (status) => {
    if (status === task.status){
      alert('Change status to update')
      return 
    }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${taskId}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: status }), 
      });
      const json = await res.json();
      if(json.message = "successfully updated status"){
        alert("Updated successfully");
        setTaskState(!taskState)
        setIsModalOpen(false);
        return 
      }
       alert("Try again!!!");
     
    } catch (err) {
      console.log(err);
    }
    setIsModalOpen(false);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };
  const deleteTask = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${taskId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.message === "Successfully deleted task") {
        alert("Task deleted successfully");
        setTaskState(!taskState);
        router.push("/Routes/Dashboard"); // Refresh the task state to remove deleted task from view
      } else {
        alert("Failed to delete task");
      }
    } catch (err) {
      console.log("Error deleting task:", err);
      alert("An error occurred while trying to delete the task.");
    }
  };
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
        {/* <h3 className="text-lg font-semibold mb-2">Screenshot</h3> */}
        <div className="flex">
          {/* <Image
            src={task.screenshot || `/placeholder.svg`}
            alt="Task Screenshot"
            width={600}
            height={400}
            className="w-128 h-64 object-cover rounded-lg"
          /> */}
          <button
            onClick={toggleModal}
            className="py-2 px-4 h-14 rounded-lg text-white bg-blue-500 hover:text-white transition-all focus:outline-none"
          >
            Update Task
          </button>
          <button
            onClick={deleteTask}
            className="py-2 px-4 h-14 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all focus:outline-none ml-4"
          >
            Delete Task
          </button>
        </div>
      </div>
      {isModalOpen && (
        <UpdateStatus toggleModal={toggleModal} projectId={projectId} onClose={onClose} onCancel={onCancel} />
      )}
    </div>
  );
};

const TaskContent = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const [task, setTask] = useState(null);
  const { projectDetails, setNavbarState, taskState } = useProjectData();


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
  }, [taskId, setNavbarState,taskState]);

  if (!task) return <div>Loading...</div>;

  const projectName = projectDetails[task.projectId - 1]?.projectName || "Unknown Project";

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-[65%]">
        <TaskDetails task={task} projectName={projectName} taskId={taskId} />
      </div>
      <div className="lg:w-[35%]">
        <ChatBox />
      </div>
    </div>
  );
};

const TaskPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <TaskContent />
      </Suspense>
    </div>
  );
};

export default TaskPage;
