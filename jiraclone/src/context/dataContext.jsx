"use client"
import React, { createContext, useState, useContext, useEffect } from "react";

const dataContext = createContext();

const useDataContext = () => {return useContext(dataContext)};

const DataContextProvider = ({children})=>{
    const [userData, setUserData] = useState(null);
    return (
        <dataContext.Provider value={{userData, setUserData}}>
            {children}
        </dataContext.Provider>
    )
};

export {useDataContext};
export default DataContextProvider;