import { createContext, useState, useEffect } from 'react';

// Crear el contexto de React
export const DataTableContext = createContext();

// Crear el proveedor del contexto
export const DataTableContextProvider = (props) => {
    // Estado para almacenar los datos
    const [data, setData] = useState([]);

    // Función para obtener datos de la URL proporcionada
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);

            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error("Error al obtener datos del servidor:", error);
        }
    }

    // Ejecutar fetchData cada 5 segundos
    useEffect(() => {
        fetchData(props.url); // Obtener datos inicialmente
        const intervalId = setInterval(() => {
            fetchData(props.url);
        }, 60000);
        return () => clearInterval(intervalId); // Limpiar intervalo al desmontar
    }, [props.url]);

    // Proveer el contexto con los datos
    return (
        <DataTableContext.Provider value={{ data }}>
            {props.children}
        </DataTableContext.Provider>
    );
};
