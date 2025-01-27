import React, { useState, useEffect, useRef } from 'react';
import Tarjeta from '../components/Tarjeta';
import { useGlobalTramaContext } from '../contexts/TramaProvider';

const GrillaPrincipal = () => {
    //Almacena el mensaje proveniente de la trama de la plaqueta
    const { message, isConnected, connection, enviarMensajeBackend } = useGlobalTramaContext();
    //Almaceno el mensaje en data 
    const [data, setData] = useState([]);
    //Agrupo los datos de las barreras para manipularlos mas facilmente
    const [groupedData, setGroupedData] = useState({});
    //Cantidad de tarjetas que se van a mostrar por cantidad de barreras en la base de datos
    const [tarjetasARenderizar, setTarjetasARenderizar] = useState([]);
    //Indice de las tarjetas cuando se pasa de pagina 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [estadoSignalR, setEstadoSignalR] = useState(2); // Estado de cálculo basado en tarjetas de SignalR
    const [alive, setAlive] = useState(0); // Estado de cálculo basado en tarjetas de SignalR

    //Al hacer click se despliega un menu esto almacena si esta abierto o no
    const [isMenuOpen, setMenuOpen] = useState(false);
    //El id de la tarjeta que se lickeo se almacena aca
    const [selectedTarjetaId, setSelectedTarjetaId] = useState(null);
    //Referencia al menu
    const menuRef = useRef(null);
    //Cantidad de tarjetas por pagina
    const itemsPerPage = 10;

    useEffect(() => {
        // Traigo todas las barreras de la  base de datos
        const fetchData = async () => {
            try {   
                const response = await fetch(import.meta.env.VITE_REACT_APP_BARRERA_URL);
                if (response.ok) {
                    const responseData = await response.json();
                    // Actualizar el estado de los datos con la respuesta de la API
                    setData(responseData);
                } else {
                    console.error('Error al obtener los datos de la API');
                }
            } catch (error) {
                console.error('Error en la petición fetch:', error);
            }
        };

        // Llamar a la función de fetch
        fetchData();
    }, []); // El array de dependencias está vacío para que se ejecute solo una vez al montar el componente

    //por cada mensaje que llega voy a actualizar en data los mensajes guardados
    useEffect(() => {
        if (message?.idBarrera) {
            setGroupedData((prevData) => {
                const updatedData = { ...prevData };
                const idBarrera = message.idBarrera;
    
                updatedData[idBarrera] = [message];
    
                return updatedData;
            });
        }
    }, [message]);

    //Compruebo dependiendo si recibo Gate_a_0 y gate_b_0 seteo si la barrera esta a 0 grados 45 o 90 grados
    useEffect(() => {
        const uniqueIdBarreras = {};
        const tarjetas = [];
    
        Object.values(groupedData).forEach((messages) => {
            messages.forEach((message) => {
                const gateA0 = message.tiempoReal[0]?.gate_A_0;
                const gateA90 = message.tiempoReal[0]?.gate_A_90;
                const gateB0 = message.tiempoReal[0]?.gate_B_0;
                const gateB90 = message.tiempoReal[0]?.gate_B_90;
                
                let alarma = false;
                let estado = 2;
                let alive = 0;
                let Pan = 0;
                
                if (gateA90 || gateB90 ) {
                    estado = 0;
                    Pan = 1;
                } else if (gateA0 || gateB0) {
                    estado = 1;
                    Pan = 2;
                } else {
                    Pan = 0;
                }
    
                if (message.tiempoReal[0]?.consoleAlive) {
                    alive = 1;
                }
    
                if (message.tiempoReal[0]?.alarma16 & 0b11011001 ||message.tiempoReal[0]?.alarma17 & 0b10011111 || message.tiempoReal[0]?.alarma18 > 0) {
                    alarma = true;
                }
    
                const tarjetaData = {
                    titulo: `${message.nombre}`,
                    progresiva: `${message.progresiva}`,
                    estado: estado,
                    Pan: Pan,
                    Alarma: alarma,
                    alive: alive,
                    tipo: 'SignalR',
                    idBarrera: message.idBarrera,
                    tiempoReal: message.tiempoReal || [],
                };
    
                if (!uniqueIdBarreras[tarjetaData.idBarrera] || tarjetaData.tipo === 'SignalR') {
                    uniqueIdBarreras[tarjetaData.idBarrera] = true;
                    tarjetas.push(tarjetaData);
                }
    
                setEstadoSignalR(estado);
                setAlive(alive);
            });
        });
    
        const tarjetasData = data.map((item) => {
            const gateA0 = item.gate_A_0;
            const gateA90 = item.gate_A_90;
            const gateB0 = item.gate_B_0;
            const gateB90 = item.gate_B_90;
    
            let alarma = false;
            let estado = 2;
            let alive = 0;
            let Pan = 0;
            
            if (gateA90 && gateB90) {
                estado = 0;
                Pan = 1;
            } else if (gateA0 && gateB0) {
                estado = 1;
                Pan = 2;
            } else {
                Pan = 0;
            }
    
            if (item.tiempoReal?.[0]?.consoleAlive) {
                alive = 1;
            }
    
            if (item.tiempoReal?.[0]?.alarma16 > 0 || item.tiempoReal?.[0]?.alarma17 > 0 || item.tiempoReal?.[0]?.alarma18 > 0) {
                alarma = true;
            }
    
            const tarjetaData = {
                titulo: `${item.nombre}`,
                progresiva: `${item.progresiva}`,
                estado: estado,
                alive: alive,
                Pan: Pan,
                tipo: 'Data',
                idBarrera: item.idBarrera,
            };
    
            if (!uniqueIdBarreras[tarjetaData.idBarrera] || tarjetaData.tipo === 'SignalR') {
                uniqueIdBarreras[tarjetaData.idBarrera] = true;
                tarjetas.push(tarjetaData);
            }
        });
    
        tarjetas.sort((a, b) => parseInt(a.progresiva, 10) - parseInt(b.progresiva, 10));
        setTarjetasARenderizar(tarjetas);
    }, [data, groupedData]);

    //Evento que setea el siguiente indice  esto es para hacerel cambio de pagina
    const handleNextClick = () => {
        const lastIndex = data.length - 1;
        const newIndex = currentIndex + itemsPerPage;
        setCurrentIndex(newIndex <= lastIndex ? newIndex : lastIndex);
    };
    //Evento que setea el indice anterior. Cambio de pagina
    const handlePrevClick = () => {
        const newIndex = currentIndex - itemsPerPage;
        setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    };
    //Cuando clickeas la tarjeta tomas el id de la barrera ademas de cerrar y abrir el menu
    const handleTarjetaClick = (idBarrera, latitud, longitud) => {
        if (selectedTarjetaId === idBarrera) {
            // Si ya está abierta, cierra el menú
            setMenuOpen(false);
            setSelectedTarjetaId(null);
        } else {
            // Abre el menú para la tarjeta clickeada y navega a la página con coordenadas
            setMenuOpen(true);
            setSelectedTarjetaId(idBarrera);
    
        }
    };

    useEffect(() => {
        if (!isMenuOpen) {
        }
    }, [isMenuOpen]);

    return (
        <div className="mx-auto my-12 bg-secondary-content-bg text-white rounded-md p-4 ml-4 mr-4 relative">
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
            >
                &lt;
            </button>

            <div className="grid grid-cols-5">
    {tarjetasARenderizar.map((tarjeta, index) => ( // Agrega la variable tarjeta aquí
        <div key={index} className="border border-white border-dashed p-4 relative" ref={menuRef}>
            <div className="bg-white rounded-md p-0.5">
                <div onClick={() => handleTarjetaClick(tarjeta.idBarrera)}>
                    <Tarjeta
                        titulo={tarjeta.titulo}
                        progresiva={tarjeta.progresiva} 
                        estado={tarjeta.estado}
                        alive={tarjeta.alive}
                        idBarrera={tarjeta.idBarrera}
                        Pan={tarjeta.Pan}
                        Alarma={tarjeta.Alarma}
                    />
                </div>
                {isMenuOpen && selectedTarjetaId === tarjeta.idBarrera && (
                    <div className="absolute left-full top-0 bg-gray-200 p-2 mt-2 z-10 w-full">
                        <p className="text-black">ID de la tarjeta: {tarjeta.idBarrera}</p>
                        <a href={`/TiempoReal/${tarjeta.idBarrera}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline">Tiempo Real</a>
                        <a href={`/Ubicacion/${tarjeta.idBarrera}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline">Ubicación</a>
                        <a href={`/AlarmaDeEvento/${tarjeta.idBarrera}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline">Alarma de Eventos</a>
                    </div>
                )}
            </div>
        </div>
    ))}
            </div>

            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={handleNextClick}
                disabled={currentIndex + itemsPerPage >= data.length}
            >
                &gt;
            </button>
        </div>
    );
};

export default GrillaPrincipal;
