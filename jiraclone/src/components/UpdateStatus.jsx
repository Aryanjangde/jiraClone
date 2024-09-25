import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // FontAwesome or similar icon library

const UpdateStatus = ({ onClose, onCancel }) => {
  const [status, setStatus] = useState("IN_PROGRESS");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 transform transition-transform duration-300 ease-in-out">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Update Status</h2>
          <button onClick={onCancel} className="text-gray-600 hover:text-gray-900">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Label and Select Dropdown */}
        <label htmlFor="status" className="block text-md font-semibold text-gray-700 mb-2">
          Select new status:
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        >
          <option value="TODO" className="text-yellow-500">
            TODO
          </option>
          <option value="IN_PROGRESS" className="text-yellow-500">
            IN-PROGRESS
          </option>
          <option value="DONE" className="text-green-500">
            DONE
          </option>
        </select>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={()=>onClose(status)}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
