import React from "react";
//importa el mapa de google de ubicacion en tiempo real
import RealTimeMap from "../components/RealTimeMap";


const Ubicacion = () => {

    return (

        <div className="p-6 bg-secondary-dark-bg rounded-3xl">
                <div className="bg-page-title-background text-white text-2xl text-gotham p-4">Ubicación</div>
               <RealTimeMap></RealTimeMap>
            </div>
    );
};

export default Ubicacion;
