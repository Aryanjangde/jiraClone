const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-blue-100">
    <h3 className="font-semibold text-lg mb-2 text-blue-800">{task.name}</h3>
    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
    <div className="flex justify-between text-sm mb-2">
      <span className={`px-2 py-1 rounded ${
        task.priority === 'HIGH' ? 'bg-red-200 text-red-800' :
        task.priority === 'MEDIUM' ? 'bg-yellow-200 text-yellow-800' :
        'bg-green-200 text-green-800'
      }`}>
        {task.priority}
      </span>
      <span className="text-blue-600">{task.deadline}</span>
    </div>
    <div className="text-xs text-gray-500 flex justify-between">
      <span>Status: {task.status}</span>
      <span>Created At: {new Date(task.created_at).toLocaleDateString()}</span>
    </div>
    <div className="text-xs text-gray-500 mt-2">
      Type: {task.type}
    </div>
  </div>
);
