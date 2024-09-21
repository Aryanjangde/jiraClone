import {useDragContext} from "../context/DragAndDropContext";

const TaskCard = ({ task, index}) => {
  

  return(
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-blue-100 " draggable >
    <h3 className="font-semibold text-lg mb-2 text-blue-800">{task.name}</h3>
    <div className="flex justify-between text-sm">
      <span className={`px-2 py-1 rounded ${
        task.priority === 'High' ? 'bg-red-200 text-red-800' :
        task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
        'bg-green-200 text-green-800'
      }`}>
        {task.priority}
      </span>
      <span className="text-blue-600">{task.deadline}</span>
    </div>
  </div>
  ) 
}

export default TaskCard;