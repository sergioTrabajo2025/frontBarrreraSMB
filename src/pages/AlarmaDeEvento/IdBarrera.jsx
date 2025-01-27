import React, { useState,useEffect } from 'react';
import Table from "../../components/Table";
import { DataTableContextProvider} from '../../contexts/DataTableContext';
import { useParams } from 'react-router-dom';

// Trae los eventos de esa barrera en especifico si se clickea en el desplegable en la grilla

//Creo las columnas de la tabla que posteriormente voy a llamar con una consulta del back
const columns = [
  {
    name: 'Barrera',
    selector: (row) => row.nombre,
    width: '7%',
    center: 'true',
  },
  {
    name: 'Evento',
    selector: (row) => row.evento,
    width: '35%',
    center: 'true',
  },
  {
    name: 'Id Evento',
    selector: (row) => row.alarmadeevento_idAlarma_de_evento,
    width: '9%',
    center: 'true',
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
    format: (row) => row.horario.toString().replace('T', ' '),
    width: '18%',
    center: 'true',
  }
];



const idBarreraPage = () => {
  //Crea el filtro para selecionar hora dia semana historico
  const [selectedFilter, setSelectedFilter] = useState("hour");
  //Variable para almacenar la url de la peticion
  const [url, setUrl] = useState();
  //Guardo el id de la barrera a la que estoy llamado se usa use params xq viene por parametro  por ejemplo sitioweb/1. 1 es el id de parametro
  const { idBarrera } = useParams();

  //Cambio de evento con el selector
  function handleChange(event) {
      setSelectedFilter(event.target.value);
  }
  //Dependiendo del selector cambia la url
  useEffect(() => {
      SetEndpointBasedOnDropDown();
  }, [selectedFilter]);

  function SetEndpointBasedOnDropDown() {
      if (selectedFilter === "hour") {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_HOUR);
      } else if (selectedFilter === "day") {
          setUrl(import.meta.env.VITE_REACT_APP_API_URL_DAY);
      } else if (selectedFilter === "week") {
          setUrl(import.meta.env.VITE_REACT.REACT_APP_API_URL_WEEK);
      } else if (selectedFilter === "history") {
        setUrl(`http://15.228.48.3:8080/api/AlarmaDeEvento/${idBarrera}`);
            }
  }   

return (
      <div className="dark:bg-secondary-dark-bg rounded-3xl">
          <div className="p-6  dark:bg-secondary-dark-bg rounded-3xl">
              <div className="bg-page-title-background grid grid-cols-3 gap-4">
                  <div className=" text-white text-2xl text-gotham p-4 mt-1.5">Alarma de Eventos</div>
                  <div className=" text-white text-2xl text-gotham p-4">Filtrar Por: &nbsp;
                  <select id="filtro" onChange={handleChange} onBlur={SetEndpointBasedOnDropDown} className=" text-gray-400 p-2 bg-transparent ">
                          <option value="hour">Hora</option>
                          <option value="day">Dia</option>
                          <option value="week">Semana</option>
                          <option value="history">Histórico</option>
                      </select>

                  </div>
                  <div className="bg-page-title-background text-white text-2xl text-gotham p-4">Formación &nbsp;
                  <select id="filtro" onChange={handleChange} onBlur={SetEndpointBasedOnDropDown} className=" text-gray-400 p-2 bg-transparent ">
                          <option value="Formacion 1">EMU CSR M20</option>
                          <option value="Formacion 2">EMU CSR M15</option>
                          <option value="Formacion 3">EMU CSR M18</option>
                      </select>
                  </div>
              </div>
              <div className="p-2 bg-page-title-background mt-4 rounded-2xl">

          <DataTableContextProvider url={url}>
              <Table columns={columns} endpoint = {url} localStorageKey ="AlarmaDeEvento" />
              </DataTableContextProvider>
              </div>
          </div>
      </div>
  );
};


export default idBarreraPage;
