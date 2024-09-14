"use client";
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateIssue from './CreateIssue';
import Image from 'next/image';
// import jiraSvg from "@images/jira-1.svg"
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-screen h-24 bg-blue-300 text-white flex transition">
        <div className="p-4 gap-3 flex">
          {/* Sidebar content */}
          <div>
          <Image src="/images/jiraLogo.svg" alt="My Icon" className='' width={60} height={60}/>
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
      </nav>

      {/* Modal */}
      {isModalOpen && (
       <CreateIssue toggleModal={toggleModal}/>
      )}
    </div>
  );
};

export default Sidebar;
