"use client"
import React, { createContext, useState, useContext, useEffect } from "react";

const DragContext = createContext();
const useDragContext = () => {useContext(DragContext)}

const DragContextProvider = ({children})=>{
    const [activeTab, setActiveTab] = useState();
    return (
        <DragContext.Provider value={{activeTab, setActiveTab}}>
            {children}
        </DragContext.Provider>
    )
}

export {useDragContext};
export default DragContextProvider;