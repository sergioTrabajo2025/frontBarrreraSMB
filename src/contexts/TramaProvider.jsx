  import React, { createContext, useState, useEffect, useContext } from 'react';
  import { HubConnectionBuilder } from '@microsoft/signalr';

  // Contexto para los datos globales de trama
  const GlobalTramaContext = createContext();
  // Contexto para los datos de trama de un canal específico
  const SpecificChannelTramaContext = createContext();


  export const GlobalTramaContextProvider = (props) => {
    const [connection, setConnection] = useState();
    const [message, setMessage] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [groupMessage, setGroupMessage] = useState(null);
    const { idBarrera } = props;


    useEffect(() => {
      // Crea una nueva conexión al hub de SignalR
      const newConnection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_REACT_APP_REALTIMEHUB_URL)
        .withAutomaticReconnect()
        .build();

      newConnection
      .start()
      .then(() => {
        newConnection.invoke('ConectarConGrupo', "1").then(() => {
          console.log(`Conectado a GrupoBarrera y unido a ${idBarrera}`);
        })
      })
      .catch(error => {
        console.error('Error al establecer la conexión:', error);
        // Si ocurre un error al establecer la conexión, programar un reintento
      });

      // Establece el estado de la conexión
      setConnection(newConnection);

      // Listeners de eventos para mensajes entrantes del back llamado Receive mmessage
      newConnection.on('ReceiveMessage', (jsonMessage) => {
        const parsedMessage = JSON.parse(jsonMessage);
        setMessage(parsedMessage);
        setIsConnected(true);
      });
      // Listeners de eventos para mensajes entrantes del back llamado ReceiveGroupMessage
      newConnection.on('ReceiveGroupMessage', (jsonMessage) => {
        const parsedMessage = JSON.parse(jsonMessage);
        setGroupMessage(parsedMessage);
        setIsConnected(true);
      });
      //Funcion para saber si el server esta online o no
      newConnection.on('Pong', () => {
        setIsConnected(true);
      });

      newConnection.start().then(() => {});
      // Función de limpieza
      return () => {
        newConnection.off('ReceiveMessage');
        newConnection.off('ReceiveGroupMessage');
        newConnection.off('Pong');
        newConnection.stop();
      };
    }, 
    [idBarrera]);

    // Provee el contexto global de trama
    return (
      <GlobalTramaContext.Provider value={{ message, groupMessage, isConnected, connection }}>
        {props.children}
      </GlobalTramaContext.Provider>
    );
  };

  export const SpecificChannelTramaContextProvider = (props) => {
    const [specificChannelMessage, setSpecificChannelMessage] = useState(null);


    return (
      <SpecificChannelTramaContext.Provider value={{ specificChannelMessage }}>
        {props.children}
      </SpecificChannelTramaContext.Provider>
    );
  };

  export const useGlobalTramaContext = () => {
    return useContext(GlobalTramaContext);
  };

  export const useSpecificChannelTramaContext = () => {
    return useContext(SpecificChannelTramaContext);
  };