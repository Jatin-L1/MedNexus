"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// * 1. Context created
const aiChatDataContext = createContext(null);

function AiChatDataProvider({ children }) {
    const [data, setData] = useState([]);

    // * 2 Load chat history from localStorage when the provider mounts on layout.js
    useEffect(() => {
        const savedData = localStorage.getItem("chatData");
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    // * 3 Set chat history, and save it to the localStorage
    useEffect(() => {
        if (data.length > 0) {
            localStorage.setItem("chatData", JSON.stringify(data));
        }
    }, [data]);

    // * 4 Create a Provider and pass the values
    return (
        <aiChatDataContext.Provider value={{ data, setData }}>
            {children}
        </aiChatDataContext.Provider>
    );
}

function useAiChatData() {
    const context = useContext(aiChatDataContext);
    if (context === null) {
        throw new Error("useAiChatData must be used within an AiChatDataProvider");
    }
    return context;
}

export { AiChatDataProvider, useAiChatData };