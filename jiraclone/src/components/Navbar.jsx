"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "./CreateIssue";
import { useProjectData } from '../context/Context';
import ProfileModal from "./profileModal";
import {usePathname, useRouter} from 'next/navigation'



const SidebarNavbar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectDetails, setProjectDetails, projectId, setProjectId, navbarState } = useProjectData();
  const [projectOption, setProjectOption] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);

  const pathname = usePathname()

  const router = useRouter()
  console.log(pathname)

  const handleDashBoardClick = () =>{
    router.push('/')
  }

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/projects`);
        const json = await res.json();
        console.log(json.data, "cvv")
        setProjectOption(json.data);

        // Set all project details after fetching the options
        if (json.data.length > 0) {
          const details = json.data.map((name, index) => ({
            projectId: index + 1, // Assuming ID starts from 1
            projectName: name,
          }));
          setProjectDetails(details); // Set all project details at once
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    getProjects();
  }, []); // Runs once when the component mounts
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if(pathname === '/Routes/LandingPage') {
    return 
  }
  return (
    <div className="w-screen">
      <nav className="w-full h-20 bg-gradient-to-r from-blue-400 bg-cyan-200 text-white flex justify-between items-center px-4 shadow-md">
        {
          !navbarState ?
        (<div className="flex items-center gap-4">
          <select
            className="bg-white text-blue-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{setProjectId(Number(e.target.value)+1)}}
          >
            {projectOption?.length > 0 ? (
              projectOption.map((name, index) => (
                <option key={index} value={index}>
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
              <div className="self-center">
                <FaPlus />
              </div>
              <span className="ml-2">Create Issue</span>
            </div>
          </button>
        </div>
        ) : 
        <button 
        className="flex items-center py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700  hover:text- transition-all focus:outline-none"
        onClick={handleDashBoardClick}
        >DashBoard</button>
        }
        <div className="flex items-center gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-12 rounded-lg transition-all"
            onClick={() => setOpenProfile(true)}
          >
            Profile
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <CreateIssue toggleModal={toggleModal} projectId={projectId} />
      )}
      {openProfile && <ProfileModal setOpenProfile={setOpenProfile} />}
    </div>
  );
};

export default SidebarNavbar;
