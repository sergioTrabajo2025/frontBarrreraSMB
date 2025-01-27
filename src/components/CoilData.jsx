import React, { useContext } from "react";
import { DataTableContext } from '../contexts/DataTableContext';


/*Creo el componente  de tabla donde voy a detectar las bobinas 
 *Vuelvo a aplicar el mismo fondo que los componentes anteriores pero esta vez voy a usar el componente GRID(Grilla) que es basicamente dividir la pantalla
  en una grilla de 3 x 4 voy a setear el texto en blanco y justificarlo al centro 
 *A cada variable voy a justificarla en el centro y ponerle un borde negro para dar formato de tabla
 */


const CoilData = () => {
    const { data } = useContext(DataTableContext);
    const ultBobina = data.slice(-1);


    return (
        <div className="flex flex-col flex-grow items-center  bg-secondary-content-bg text-white rounded-md justify-center p-4  ...">
            <div className="flex flex-nowrap">
                <div>F</div>
                <div className="flex justify-center bg-light-gray bg-right text-white rounded-md w-14 ml-4 mr-2 p-1">{ultBobina[0]?.frecuencia}</div>
                <div>dBv</div>
                <div className="flex justify-center bg-light-gray bg-right text-white rounded-md w-14 ml-4 mr-2 p-1">{ultBobina[0]?.dbv}</div>
                <div>Q</div>
                <div className="flex justify-center bg-light-gray bg-right text-white rounded-md w-14 ml-4 mr-2 p-1">{ultBobina[0]?.q}</div>
                
            </div>
        </div>   
    );
}
    

export default CoilData;
