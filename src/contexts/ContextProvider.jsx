import React, { createContext, useContext, useState } from "react";

//Los context permiten enviar datos a otros componentes y reutilizar codigo 
// en este caso lo que hace es la configuracion general de la pagina esto NO SE TOCA

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    //Variable global para guardar la resolucion de la pantalla
    const [screenSize, setScreenSize] = useState(undefined);
    //Guarda el color cuando selecionas un atributo del menu
    const [currentColor, setCurrentColor] = useState("#1EB9EC");
    //Si la pagina esta en modo oscuro o modo blanco
    const [currentMode, setCurrentMode] = useState("Dark");
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    
    // Nueva variable para almacenar el ID del nodo seleccionado
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    
    //Funcion antigua que no se usa mas era para cambiar el modo de oscuro a blanco
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem("themeMode", e.target.value);
    };
    //Funcion de cambiar el color del menu... no se usa mas 
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem("colorMode", color);
    };

    

    return (
        <StateContext.Provider
            value={{
                currentColor,
                currentMode,
                activeMenu,
                screenSize,
                setScreenSize,
                setActiveMenu,
                setCurrentColor,
                setCurrentMode,
                setMode,
                setColor,
                themeSettings,
                setThemeSettings,
            
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
