import React, { useState, useEffect, useRef } from "react";
import {
  GlobalTramaContextProvider,
  useGlobalTramaContext,
} from "../contexts/TramaProvider";
import BarrierChecking from "../components/BarrierChecking";
import SignalsChecker from "../components/SignalsChecker";


const TiempoReal = () => {
  // State variables
  const [selectedFilter, setSelectedFilter] = useState("hour");
  const [url, setUrl] = useState(""); // State for URL
  const { message, groupMessage, isConnected, connection } = useGlobalTramaContext();
  const [estado, setEstadoBarrier] = useState("2");
  const [flashColor, setFlashColor] = useState('#FF0000');
  const [flashColor2, setFlashColor2] = useState('#808080');
  const [Destello, setDestello] = useState('#808080');
  const [Destello2, setDestello2] = useState('#808080');
  const [options, setOptions] = useState([]);
  const [selectedBarrierId, setSelectedBarrierId] = useState("");

  // Trae de la api barrera las barreras para rellenar la grilla 
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
          value: `${option.nombre} P:${option.progresiva} `,
          progresiva: option.progresiva,
          id: option.idBarrera,
        }));
        setOptions(formattedOptions);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  }, []);
  // Funcion que determina cuando debe de iniciar el  destellador numero 1
  useEffect(() => {
    let intervalId2;
    
    const startFlash = () => {
      let alternateColor = true;
      intervalId2 = setInterval(() => {
        setFlashColor((prevColor) => (alternateColor ? '#FF0000' : '#808080'));
        setFlashColor2((prevColor) => (alternateColor ? '#808080' : '#FF0000'));
        alternateColor = !alternateColor;
      }, 1000);
    };

    const stopFlash = () => {
      clearInterval(intervalId2);
    };

    const checkValues = () => {
      const shouldStartFlash = groupMessage?.tiempoReal[0]?.l1_a === true &&
                               groupMessage?.tiempoReal[0]?.l1_b === true;
      if (shouldStartFlash && !intervalId2) {
        startFlash();
      } else  {
        stopFlash();
        setFlashColor('#808080');
        setFlashColor2('#808080');
      }
    };

    checkValues();

    return () => {
      clearInterval(intervalId2);
    };
  }, [groupMessage?.tiempoReal[0]?.l1_a, groupMessage?.tiempoReal[0]?.l1_b]);

  // Destello effects based on conditions
  useEffect(() => {
    //Hay que diferenciar los intervalos si no cuando se activa uno se activan los 2
    let intervalId;
    let intervalId1;
        //funcion de hacer destellar el icono pero el destellador numero 1
    const startDestellador1 = () => {
      let alternateColor = true;
      intervalId = setInterval(() => {
        setDestello((prevColor) => (alternateColor ? '#ffffff' : '#808080'));
        alternateColor = !alternateColor;
      }, 1000);
    };
    //Termina de destellar el icono1
    const stopDestellador1 = () => {
      clearInterval(intervalId);
      setDestello('#808080');
    };
    //Funcion de hacer destellar el icono pero el destellador numero 2
    const startDestellador2 = () => {
      let alternateColor2 = true;
      intervalId1 = setInterval(() => {
        setDestello2((prevColor) => (alternateColor2 ? '#ffffff' : '#808080'));
        alternateColor2 = !alternateColor2;
      }, 1000);
    };
    //Termina de destellar el icono2
    const stopDestellador2 = () => {
      clearInterval(intervalId1);
      setDestello2('#808080');
    };

    //Chequea constantemente los valores de los destelladores para saber si tiene que iniciar la funcion de destello o no
    const checkValues = () => {
      if (groupMessage?.tiempoReal[0]?.destelloIndicFuncPaso1 === true && !intervalId) {
        startDestellador1();
      } else {
        stopDestellador1();
      }

      if (groupMessage?.tiempoReal[0]?.destelloIndicFuncPaso2 === true && !intervalId1) {
        startDestellador2();
      } else {
        stopDestellador2();
      }
    };

    checkValues();

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId1);
    };
  }, [groupMessage?.tiempoReal[0]?.destelloIndicFuncPaso1, groupMessage?.tiempoReal[0]?.funcpaso1, groupMessage?.tiempoReal[0]?.funcpaso2, groupMessage?.tiempoReal[0]?.destelloIndicFuncPaso2]);

  // Cambio de filtro para hora dia semana historico
  function handleChange(event) {
    setSelectedFilter(event.target.value);
    const selectedOption = options.find(option => option.value === event.target.value);
    if (selectedOption) {
      setSelectedBarrierId(selectedOption.id);
      // Redirecciona en la misma pestaña a la URL basada en la URL actual
      window.location.href = `${window.location.origin}/TiempoReal/${selectedOption.id}`;
    } else {
      setSelectedBarrierId(""); // Reiniciar el ID si no se encuentra la opción seleccionada
    }
  }
  // Actualmente esta funcion fue removida pero se encarga de hacer destellar el icono cambiando de color
  useEffect(() => {
    if (groupMessage?.tiempoReal[0]?.indicFuncPaso1 === true) {
      setDestello('#ffffff');
    } else {
      setDestello('#808080');
    }
  }, [groupMessage?.tiempoReal[0]?.indicFuncPaso1]);

  // Actualmente esta funcion fue removida pero se encarga de hacer destellar el icono cambiando de color
  useEffect(() => {
    if (groupMessage?.tiempoReal[0]?.indicFuncPaso2 === true) {
      setDestello2('#ffffff');
    } else {
      setDestello2('#808080');
    }
  }, [groupMessage?.tiempoReal[0]?.indicFuncPaso2]);

  // Determina el estado de la barrera si esta a 0 45 90 grados
  function barrierState() {
    let estado = 2;
  
    if (groupMessage?.tiempoReal[0]?.gate_A_90 && groupMessage?.tiempoReal[0]?.gate_B_90) {
      estado = 0;  
    } 
    if (groupMessage?.tiempoReal[0]?.gate_A_0 && groupMessage?.tiempoReal[0]?.gate_B_0) {
      estado = 1;
    }
    else if (groupMessage?.tiempoReal[0]?.gate_A_broken_arm && groupMessage?.tiempoReal[0]?.gate_B_broken_arm) {
      estado = 2;
    }
  
    return estado;
  }

  useEffect(() => {
    setEstadoBarrier(barrierState());
  
  }, [groupMessage]);


  return (
    <GlobalTramaContextProvider idBarrera={selectedBarrierId.toString()}>
      <div className="p-6  bg-secondary-
      -bg rounded-3xl relative flex items-center justify-center">
        <div className="bg-page-title-background  w-full grid grid-cols-3 gap-4">
          <div className="text-white text-2xl text-gotham p-2 mt-3">
            Tiempo Real
          </div>
          
          <div className="bg-page-title-background text-white flex justify-center text-2xl text-gotham p-4">
            Barrera &nbsp;
            <select
              id="filtro"
              onChange={handleChange}
              className="text-gray-400 p-2 bg-transparent"
            >
              {options.map(option => (
  <option key={option.value} value={option.value}>
    {option.label || option.value}
  </option>
))}
            </select>
          </div>
        </div>
      </div>
      <div><BarrierChecking groupMessage={groupMessage}/></div>
      <div><SignalsChecker groupMessage={groupMessage}/></div>
    </GlobalTramaContextProvider>
  );
};

export default TiempoReal;
