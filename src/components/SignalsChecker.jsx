import React, { useEffect, useState } from 'react';

const SignalsChecker = ( groupMessage) => {
  const [isActive, setIsActive] = useState(false);
  const [prevHorario, setPrevHorario] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHorario = groupMessage?.groupMessage?.tiempoReal[0]?.horario;

      // Verificar si el horario actual es diferente al previo
      if (currentHorario !== prevHorario) {
        setIsActive(true); // Cambia a bg-green-500
        setPrevHorario(currentHorario); // Actualiza el horario previo
      } else {
        setIsActive(false); // Cambia a bg-green-900
      }
    }, 500); // Cambia el intervalo en milisegundos según necesites

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [groupMessage, prevHorario]); // Agregar prevHorario para asegurarse de que se use el valor actualizado

  return (
    <div className="flex flex-row bg-secondary-content-bg text-white rounded-md p-2 ml-10 mr-4">
      <div className="flex flex-col flex-grow">
        <div className="mb-9 flex items-center">
          <div
            className={`h-5 w-5 mr-4 rounded-full ${
              isActive
                ? "bg-green-500"
                : "bg-green-900"
            }`}
          />
          <h2>Estado de señales</h2>
          <div className="ml-auto">
            <span className="flex justify-center">Horario: {groupMessage?.groupMessage?.tiempoReal[0]?.horario}</span>
          </div>
        </div>
        
        
        
        <div className="mr-32">
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
            className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 === true
                    ? (
                        groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 === true
                            ? "bg-green-500"
                            : "bg-green-900"
                    )
                    : "bg-gray-300"
            }`}
            />
            <h2>Gate_A_90</h2>
          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 === true
                    ? "bg-green-500"
                    : "bg-green-900"
                  : "bg-gray-300"
              }`}
            />
            <h2>Gate_A_0</h2>
          </div>
          {/* Otros elementos de la columna 1 con condicionales y h2 */}
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]
                  ?.active_gate_A_control === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]
                      ?.gate_A_control === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2>Gate_A_control</h2>
          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]
                  ?.active_gate_A_broken_arm === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]
                      ?.gate_A_broken_arm === true
                    ? "bg-red-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2>Gate_A_broken_arm</h2>
          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 ===
                true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2
      className={`${
        groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
          ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
          : ""
      }`}
    >
            Gate_B_90
            </h2>
          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0 === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2
      className={`${
        groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
          ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
          : ""
      }`}
    >
            Gate_B_0
            </h2>

          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]
                  ?.active_gate_B_control === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]
                      ?.gate_B_control === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-400 opacity-30" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
 <h2
      className={`${
        groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
          ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
          : ""
      }`}
    >
      Gate_B_Control
    </h2>

          </div>
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]
                  ?.active_gate_B_broken_arm === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]
                      ?.gate_B_broken_arm === true
                    ? "bg-red-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2
      className={`${
        groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
          ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
          : ""
      }`}
    >
            Gate_B_broken_Arm
            </h2>
          </div>
        </div>
      </div>

      {/* Columna 2 */}
      <div className="flex flex-col flex-grow mt-14">
        <div className="">
          <div className="inline-block flex align-items-left leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_cv1 === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.cv1 === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2>CV1</h2>
          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_cv2 === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.cv2 === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2>CV2</h2>
          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_cv3 === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.cv3 === true
                    ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            CV3
            </h2>
          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full  ${
                groupMessage?.groupMessage?.tiempoReal[0]
                  ?.active_door_sensor === true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.door_sensor === true
                    ? "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-gray-600  " // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />

            <h2 className="text-gray-600 opacity-50">Door_Sensor</h2>
          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_manual_key ===
                true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.manual_key === true
                    ? "bg-orange-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-gray-600" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
 <div
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "bg-gray-300" 
            : "bg-gray-300"
           }`}
           ></div> 
           <h2 className="text-gray-600 opacity-50">Automático</h2>
           
          </div>
          <div className="inline-block flex align-items-right  leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_chrg_alarm ===
                true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.chrg_alarm === true
                    ? "bg-orange-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2>Chrg_Alarm</h2>
          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_line_alive ===
                true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.line_alive === true
                    ? "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-red-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
            <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            Line_Alive 
            </h2>          </div>
          <div className="inline-block flex align-items-right leading-3 mb-3">
            <div
              className={`h-3 w-3 mr-4 rounded-full ${
                groupMessage?.groupMessage?.tiempoReal[0]?.active_aux1 ===
                true
                  ? groupMessage?.groupMessage?.tiempoReal[0]?.aux1 === true
                    ? "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                    : "bg-red-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
              }`}
            />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            AUX
            </h2>          </div>
        </div>
      </div>

      {/* Columna 3 */}
      <div className="flex flex-col flex-grow mt-14">
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]
                ?.active_indicFuncPaso1 === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.indicFuncPaso1 ===
                  true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            PAN 1 
            </h2>        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]
                ?.active_indicFuncPaso2 === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.indicFuncPaso2 ===
                  true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            PAN 2
            </h2>        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_a === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.l1_a === true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
          <h2>Falla Lampara 1</h2>
        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_b === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.l1_b === true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            Falla lámpara 2
            </h2>        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_a === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.l2_a === true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            Falla lámpara 3
            </h2>        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_b === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.l2_b === true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
 <h2
             className={`${
             groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false
            ? "text-gray-600 opacity-50" // Gris oscuro y translúcido
            : ""
           }`}
            >
            Falla lámpara 4
            </h2>        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_campana1 === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.campana1 === true
                  ? "bg-gray-600" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-green-900" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-600" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
          <h2 className="text-gray-600 opacity-50">Falla Campana 1</h2>
        </div>
        <div className="inline-block flex align-items-right leading-3 mb-3">
          <div
            className={`h-3 w-3 mr-4 rounded-full ${
              groupMessage?.groupMessage?.tiempoReal[0]?.active_campana2 === true
                ? groupMessage?.groupMessage?.tiempoReal[0]?.campana2 === true
                  ? "bg-green-500" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 1, color rojo
                  : "bg-gray-600" // Si active_gate_A_broken_arm es 1 y gate_A_broken_arm es 0, color bg-green-900
                : "bg-gray-300" // Si active_gate_A_broken_arm es 0, color gris
            }`}
          />
          <h2 className="text-gray-600 opacity-50">Falla Campana 2</h2>
        </div>
      </div>
    

    </div>
  );
};

export default SignalsChecker;
