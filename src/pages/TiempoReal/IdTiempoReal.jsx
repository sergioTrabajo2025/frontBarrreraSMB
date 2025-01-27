import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import BarrierChecking from "../../components/BarrierChecking";
import SignalsChecker from "../../components/SignalsChecker";

const IdTiempoRealPage = () => {
  const [connection, setConnection] = useState(null);
  const [GroupMessage, setGroupMessage] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedBarrierId, setSelectedBarrierId] = useState("");

  const { idBarrera } = useParams();

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_BARRERA_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching data from API');
        }
        return response.json();
      })
      .then(data => {
        const formattedOptions = data.map(option => ({
          value: `${option.nombre} P:${option.progresiva}`,
          progresiva: option.progresiva,
          id: option.idBarrera,
          label: `${option.nombre} P:${option.progresiva}`}));
        setOptions(formattedOptions);

        // Establecer el valor seleccionado basado en idBarrera
        if (idBarrera) {
          const selectedOption = formattedOptions.find(option => option.id.toString() === idBarrera);
          if (selectedOption) {
            setSelectedBarrierId(selectedOption.id);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, [idBarrera]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Information)
      .withUrl(import.meta.env.VITE_REACT_APP_REALTIMEHUB_URL)
      .withAutomaticReconnect()
      .build();

    // Connect to the hub
    connection.start()
      .then(() => {
        console.log('Conexión establecida con éxito.');
        connection.invoke('ConectarConGrupo', idBarrera)
          .then(() => {
            console.log(`Conectado al grupo Barrera${idBarrera}`);
          })
          .catch(error => console.error(`Error al conectar al grupo Barrera${idBarrera}: ${error}`));
      })
      .catch(err => console.error(`Error al iniciar la conexión: ${err}`));

    // Listen to the 'ReceiveGroupMessage' event for the specific barrier group
    connection.on('ReceiveGroupMessage', (jsonMessage) => {
      const parsedMessage = JSON.parse(jsonMessage);
      setGroupMessage(parsedMessage);
    });

    setConnection(connection);

    return () => {
      // Disconnect from the hub when the component unmounts
      connection.stop();
    };
  }, [idBarrera]);

  function handleChange(event) {
    const selectedOption = options.find(option => option.value === event.target.value);
    if (selectedOption) {
      setSelectedBarrierId(selectedOption.id);
      // Redirecciona en la misma pestaña a la URL basada en la URL actual
      window.location.href = `${window.location.origin}/TiempoReal/${selectedOption.id}`;
    } else {
      setSelectedBarrierId(""); // Reiniciar el ID si no se encuentra la opción seleccionada
    }
  }

  return (
    <div>
      <div className="p-6 dark:bg-secondary-dark-bg rounded-3xl relative flex items-center justify-center">
        <div className="bg-page-title-background w-full grid grid-cols-3 gap-4">
          <div className="text-white text-2xl text-gotham p-2 mt-3">
            Tiempo Real
          </div>
          
          <div className="bg-page-title-background text-white flex justify-center text-2xl text-gotham p-4">
            Barrera &nbsp;
            <select
              id="filtro"
              value={options.find(option => option.id === selectedBarrierId)?.value || ''}
              onChange={handleChange}
              className="text-gray-400 p-2 bg-transparent"
            >
              {options.map(option => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div><BarrierChecking groupMessage={GroupMessage}/></div>
      <div><SignalsChecker groupMessage={GroupMessage}/></div>
    </div>
  );
};

export default IdTiempoRealPage;
