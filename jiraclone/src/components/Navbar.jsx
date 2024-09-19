"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "./CreateIssue";

import SearchBar from "./SearchBar";

console.log(process.env.NEXT_PUBLIC_BASE_URL, "dsfdsfsdf")

const SidebarNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectId, setProjectId] = useState(1)
  const [projectOption, setProjectOption] = useState([]);
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/projects`);
        const json = await res.json();
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
          <select className="bg-white text-blue-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e)=>{
            setProjectId(Number(e.target.value) + 1)
          }}
          
          >
          {projectOption && projectOption.length > 0 ? (
            projectOption.map((name, index) => (
            <option key = {index} value = {index} >
              {name}
            </option>
  ))
) : (
  <option value="">Loading...</option>
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
      {isModalOpen && <CreateIssue toggleModal={toggleModal} projectId = {projectId} />}
    </div>
  );
};

export default SidebarNavbar;
