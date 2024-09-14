"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "./CreateIssue";

import SearchBar from "./SearchBar";

const SidebarNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projectOption, setProjectOption] = useState([]);
  
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/projects');
        const json = await res.json();
        console.log("API Response:", json.data);
        setProjectOption(json.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    getProjects()
  }, []); // Empty dependency array means this effect runs once when the component mounts

  
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="w-screen">
      {/* Combined Navbar */}
      <nav className="w-full h-20 bg-gradient-to-r from-blue-400 bg-cyan-200 text-white flex justify-between items-center px-4 shadow-md">
        {/* Left side: Logo and Project Selector */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          

          {/* Project Selector */}
          <select className="bg-white text-blue-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          {projectOption && projectOption.length > 0 ? (
            projectOption.map((name, index) => (
            <option key = {index} value={name}>
              {name}
            </option>
  ))
) : (
  <option value="">No projects available</option>
)}
          </select>
          <button
            onClick={toggleModal}
            className="flex items-center py-2 px-4 bg-slate-50 rounded-lg hover:bg-sky-600 hover:text-white transition-all focus:outline-none"
          >
            <div className="text-blue-700 hover:text-white transition-all flex">
                <div className="self-center"><FaPlus /></div>
            <span className="ml-2">Create Issue</span>
            </div>
          </button>
        </div>
        <div>
            <SearchBar/>
        </div>

        {/* Right side: Profile and Create Issue Button */}
        <div className="flex items-center gap-4">
          {/* Profile Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 rounded-lg transition-all">
            Profile
          </button>

          {/* Create Issue Button */}
          
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && <CreateIssue toggleModal={toggleModal} />}
    </div>
  );
};

export default SidebarNavbar;
