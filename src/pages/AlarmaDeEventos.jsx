    import React, { useState,useEffect } from 'react';
    import Table from "../components/Table";
    import { DataTableContextProvider} from '../contexts/DataTableContext';
    import { useNavigate } from 'react-router-dom';
    

    //Pagina que llama al componente tabla y renderiza la correspondiente alarma de eventos tambien compuesta por un fondo gris redondeado

    const columns = [
    {
        name: 'Id Evento',
        selector: (row) => row.alarmadeevento_idAlarma_de_evento,
        width: '9%',
        center: 'true',
        sortable: true,
    },
      {
        name: 'Barrera',
        selector: (row) => row.nombre,
        width: '8%',
        center: 'true',
      },
      {
        name: 'Progresiva',
        selector: (row) => row.progresiva,
        width: '9%',
        center: 'true',
      },
      {
        name: 'Evento',
        selector: (row) => row.evento,
        width: '42%',
        center: 'true',
        wrap:true
    },
      {
        name: 'Latitud',
        selector: (row) => row.latitud,
        formatter: (cell) => parseFloat(cell).toFixed(6),
        width: '10%',
        center: 'true',
        },
      {
        name: 'Longitud',
        selector: (row) => row.longitud,
        formatter: (cell) => parseFloat(cell).toFixed(6),
        width: '10%',
        center: 'true',
      },
      {
        name: 'Horario',
        selector: (row) => row.horario,
        format: (row) => row.horario.toString().replace('T', ' '), // Use row instead of cell
        width: '10%',
        wrap:true,
        center: 'true',
      }
    ];
    

    const AlarmaDeEventos = () => {
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
            const baseUrl = import.meta.env.VITE_REACT_APP_API_URL_HISTORY;
            
            if (selectedFilter === "hour") {
                if (selectedBarrier) {
                    setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_EVENTOBARRERA_HOUR}${selectedBarrier}`);
                } else {
                    setUrl(import.meta.env.VITE_REACT_APP_API_URL_HOUR);
                }
            } else if (selectedFilter === "day") {
                if (selectedBarrier) {
                    setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_EVENTOBARRERA_DAY}${selectedBarrier}`);
                } else {
                    setUrl(import.meta.env.VITE_REACT_APP_API_URL_DAY);
                }
            } else if (selectedFilter === "week") {
                if (selectedBarrier) {
                    setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_EVENTOBARRERA_WEEK}${selectedBarrier}`);
                } else {
                    setUrl(import.meta.env.VITE_REACT_APP_API_URL_WEEK);
                }
            } else if (selectedFilter === "history") {
                if (selectedBarrier) {
                    setUrl(`${import.meta.env.VITE_REACT_APP_API_URL_EVENTOBARRERA_HISTORY}${selectedBarrier}`);
                } else {
                    setUrl(import.meta.env.VITE_REACT_APP_API_URL_HISTORY);
                }
            }
        }        
        
    
        return (
            <div className="dark:bg-secondary-dark-bg rounded-3xl">
                <div className="p-6  dark:bg-secondary-dark-bg rounded-3xl">
                    <div className="bg-page-title-background grid grid-cols-3 gap-4">
                        <div className="text-white text-2xl text-gotham p-2 mt-3">
                             Alarma de Evento
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
                                <option value="history">Histórico</option>
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
            </div>
        );
    };
    
    export default AlarmaDeEventos;