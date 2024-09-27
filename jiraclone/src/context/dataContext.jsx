"use client"
import React, { createContext, useState, useContext, useEffect } from "react";

const dataContext = createContext();

const useDataContext = () => {return useContext(dataContext)};

const DataContextProvider = ({children})=>{
    const [userData, setUserData] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <dataContext.Provider value={{userData, setUserData,
            isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </dataContext.Provider>
    )
};

export {useDataContext};
export default DataContextProvider;