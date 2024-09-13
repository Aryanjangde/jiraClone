"use client";
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateIssue from './CreateIssue';
// import jiraSvg from "@images/jira-1.svg"
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-24 h-screen bg-blue-300 text-white flex flex-col transition">
        
        <div className="flex-1 p-4 gap-3">
          {/* Sidebar content */}
          <div>
          <Image src="/images/jiraLogo.svg" alt="My Icon" className='w-16'/>
          </div>
          <div>
          <button
            onClick={toggleModal}
            className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none"
          >
            <FaPlus />
          </button>
          </div>
          {/* Add more sidebar items here */}
        </div>
      </aside>

      {/* Modal */}
      {isModalOpen && (
       <CreateIssue toggleModal={toggleModal}/>
      )}
    </div>
  );
};

export default Sidebar;
