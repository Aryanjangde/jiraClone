"use client"
import { createContext, useContext, useState } from "react";
const ProjectContext = createContext()
const ProjectProvider =  ({children})=>{
    const [projectDetails, setProjectDetails] = useState({})
    const [projectId, setProjectId] = useState(1)    
    const [state, setState] = useState(false)
    const [taskState, setTaskState] = useState(false)
    const [navbarState, setNavbarState] = useState(false)
return (
    <ProjectContext.Provider value={{
        projectDetails, setProjectDetails, 
        state, setState,projectId,setProjectId,
        navbarState,setNavbarState,
        taskState, setTaskState
    }}>
        {children}
    </ProjectContext.Provider>
)
}
export const useProjectData = () => useContext(ProjectContext)
export default  ProjectProvider