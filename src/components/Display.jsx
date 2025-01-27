import React from "react";

/*Creo un componente llamado display que se encarga de importar una fuente y asignarla un valor por default
este componente recibe como parametro(REVISAR REACT PROPS) el valor y el tama�o(por default 18 px)
seteo los parametros mencionados arriba para que el componente tenga efecto
*/

const Display = ({ value, size = "20px", ...props }) => {
    const fontSize = { fontSize: size };
    return (
        <div className="flex  items-center content-center ">
            <p
                className={`font-["Display"]  text-red-600 `}//seteo la fuente para que sea de color rojo
                style={fontSize}
                {...props}
            >
                {value}
            </p>
        </div>
    );
};

export default Display;
    