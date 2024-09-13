export default function CreateIssue({ toggleModal }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-6/12 ">
          <h2 className="text-lg font-semibold mb-4">Create Issue</h2>
          
          {/* Issue Type Dropdown */}
          <label className="block mb-2 text-sm font-medium text-gray-700">Issue Type</label>
          <select className="w-full p-2 mb-4 border border-gray-300 rounded">
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Issue">Issue</option>
          </select>
  
          {/* Short Summary */}
          <label className="block mb-2 text-sm font-medium text-gray-700">Short Summary</label>
          <input 
            type="text" 
            className="w-full p-2 mb-4 border border-gray-300 rounded" 
            placeholder="Enter a short summary"
          />
  
          {/* Description */}
          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea 
            className="w-full p-2 mb-4 border border-gray-300 rounded" 
            placeholder="Enter a description"
          ></textarea>
  
          {/* Assignees */}
          <label className="block mb-2 text-sm font-medium text-gray-700">Assignees</label>
          <select multiple className="w-full p-2 mb-4 border border-gray-300 rounded">
            <option value="User1">User1</option>
            <option value="User2">User2</option>
          </select>
  
          {/* Priority Dropdown */}
          <label className="block mb-2 text-sm font-medium text-gray-700">Priority</label>
          <select className="w-full p-2 mb-4 border border-gray-300 rounded">
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
  
          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={toggleModal}
              className="px-4 py-2 mr-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Issue
            </button>
          </div>
        </div>
      </div>
    );
  }
  