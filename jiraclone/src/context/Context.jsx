"use client"
import { createContext, useContext, useState } from "react";
const ProjectContext = createContext()
const ProjectProvider =  ({children})=>{
    const [projectId, setProjectId] = useState(1)
    const [state, setState] = useState(false)
return (
    <ProjectContext.Provider value={{
        projectId, setProjectId, 
        state, setState
    }}>
        {children}
    </ProjectContext.Provider>
)
}
export const useProjectData =() => useContext(ProjectContext);
export default  ProjectProvider;