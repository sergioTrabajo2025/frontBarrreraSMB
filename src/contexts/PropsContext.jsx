import React, { createContext, useState } from 'react';

export const PropsContext = createContext();

//DEPRECADO

export const PropsContextProvider = ({ children }) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <PropsContext.Provider value={{ selectedId, setSelectedId }}>
            {children}
        </PropsContext.Provider>
    );
};
