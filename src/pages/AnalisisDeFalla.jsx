import React, { useState,useEffect } from 'react';
import { DataTableContextProvider } from '../contexts/DataTableContext';
import Table from "../components/Table";

// Define columns for the DataTable
const columns = [
  {
    name: 'Id Estado',
    selector: (row) => row.idEstado,
    center: true,
  },
  {
    name: 'Horario',
    selector: (row) => row.horario,
    format: (row) => row.horario.toString().replace('T', ' '), // Use row instead of cell
    wrap:true,
    center: 'true',
  },
  {
    name: 'aGate90',
    selector: (row) => row.aGate90? 1 : 0,
    center: true,
  },
  {
    name: 'aGate0',
    selector: (row) => row.aGate0? 1 : 0,
    center: true,
  },
  {
    name: 'aGate Control',
    selector: (row) => row.aGateControl? 1 : 0,
    center: true,
    wrap: true,
  },
  {
    name: 'aGateBrokenarm',
    selector: (row) => row.aGateBrokenarm? 1 : 0,
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
    wrap:true
  },
  {
    name: 'cv1',
    selector: (row) => row.cv1? 1 : 0,
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
  },
  {
    name: 'cv2',
    selector: (row) => row.cv2 ? 1 : 0,
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
  },
  {
    name: 'Automático',
    selector: (row) => row.automatico ? 1 : 0, // Convert boolean to 1/0
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
  },
  {
    name: 'chrgAlarm',
    selector: (row) => row.chrgAlarm ? 1 : 0, // Convert boolean to 1/0
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
  },
  {
    name: 'AL1',
    selector: (row) => row.falla_lampara1A? 1 : 0,
    formatter: (cell) => parseFloat(cell).toFixed(6),
    center: true,
  },
  
  
  
];

const AnalisisFalla = () => {    
  // Set the URL for data fetching
 //Filtro que seleciona hora dia semana historico
 const [selectedFilter, setSelectedFilter] = useState("hour");
 //Cual es la barrera de los que queres eventos
 const [selectedBarrier, setSelectedBarrier] = useState(""); // Nuevo estado para almacenar la barrera seleccionada
 //Url de la api
 const [url, setUrl] = useState();
 //Opciones es un mapa que contiene los datos de la barrera 
 const [options, setOptions] = useState([]);

 useEffect(() => {
  // Realizar la solicitud GET a la API para obtener las opciones de formación
  fetch(import.meta.env.VITE_REACT_APP_BARRERA_URL)
      .then(response => {                    if (!response.ok) {
              throw new Error('Error al obtener los datos de la API');
          }
          return response.json();
      
      })
      .then(data => {
          // Mapear los datos recibidos para mostrar la combinación de nombre y progresiva
          const formattedOptions = data.map(option => ({
          
              value: `${option.nombre} P:${option.progresiva}`,
              id: option.idBarrera, // Agregar el ID de la barrera
          }));
          setOptions(formattedOptions);
      })                
}, []);
//Cambia entre hora dia semana historico
function handleChange(event) {
  setSelectedFilter(event.target.value);
}
//Lo mismo pero con barrera
function handleBarrierChange(event) { 
  // Obtener el índice seleccionado
  const selectedIndex = event.target.selectedIndex;
  // Obtener la opción seleccionada
  const selectedOption = event.target.options[selectedIndex];
  // Obtener el ID de la barrera del objeto de opción seleccionado
  const selectedBarrierId = selectedOption.getAttribute('data-id');
  // Establecer el ID de la barrera como selectedBarrier
  setSelectedBarrier(selectedBarrierId);
}


  useEffect(() => {
  setEndpointBasedOnDropDown();
}, [selectedFilter, selectedBarrier]); // Agregar selectedBarrier como dependencia
function setEndpointBasedOnDropDown() {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_HISTORY;
  
  if (selectedFilter === "hour") {
      if (selectedBarrier) {
          setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_BARRERA_HOUR}${selectedBarrier}`);
      } else {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_HOUR);
      }
  } else if (selectedFilter === "day") {
      if (selectedBarrier) {
          setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_BARRERA_DAY}${selectedBarrier}`);
      } else {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_DAY);
      }
  } else if (selectedFilter === "week") {
      if (selectedBarrier) {
          setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_BARRERA_WEEK}${selectedBarrier}`);
      } else {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_WEEK);
      }
  } else if (selectedFilter === "history") {
      if (selectedBarrier) {
          setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_BARRERA_HISTORY}${selectedBarrier}`);
      } else {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_ESTADOS_HISTORY);
      }
  }
}        


  return (      
    <div className="p-5 dark:bg-secondary-bg rounded-3xl">
      <div className="bg-page-title-background grid grid-cols-3 gap-4">
        <div className="text-white text-2xl text-gotham p-4">
          Análisis de falla
        </div>  
        <div className="text-white text-2xl text-gotham p-4">
                            Filtrar Por: &nbsp;
                            <select
                                id="filtro"
                                onChange={handleChange}
                                className="text-gray-400 p-2 bg-transparent"
                            >
                                <option value="hour">Hora</option>
                                <option value="day">Día</option>
                                <option value="week">Semana</option>
                           
                            </select>
                        </div>
                        <div className="bg-page-title-background text-white flex justify-center text-2xl text-gotham p-4">
                            Barrera &nbsp;
                            <select
                                id="filtroBarrera"
                                onChange={handleBarrierChange}
                                className="text-gray-400 p-2 bg-transparent"
                            >
                                <option value="">Todas</option>
                                {options.map(option => (
    <option key={option.id} value={option.id} data-id={option.id}>{option.value}</option>
))}
                            </select>
                        </div>
                    </div>
                    <div className="p-2 bg-page-title-background mt-4 rounded-2xl">
                        <DataTableContextProvider url={url}>
                            <Table columns={columns} endpoint={url} localStorageKey="AlarmaDeEvento" />
                        </DataTableContextProvider>
                    </div>
                </div>
            
  );
};

export default AnalisisFalla;
