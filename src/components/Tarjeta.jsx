import React from 'react';
import Barrera from './Barrera'; // Asegúrate de proporcionar la ruta correcta
import LinkSpinner from './Spinners/LinkSpinner'; // Reemplaza con el nombre real de tu componente LinkSpinner

const Tarjeta = ({ titulo, progresiva, estado, idBarrera, alive=0, Pan=null, Alarma=null }) => {
    // Definir colores en función del valor de Pan
    let panAbiertoColor, panCerradoColor;
    
    switch (Pan) {
        case 0:
            panAbiertoColor = 'bg-green-900';
            panCerradoColor = 'bg-green-900';
            break;
        case 1:
            panAbiertoColor = 'bg-green-500';
            panCerradoColor = 'bg-green-900';
            break;
        case 2:
            panAbiertoColor = 'bg-green-900';
            panCerradoColor = 'bg-green-500';
            break;
        default:
            panAbiertoColor = 'bg-gray-300';
            panCerradoColor = 'bg-gray-300';
    }

    // Definir color para Alarmas
    let alarmaColor;
    if (Alarma === null) {
        alarmaColor = 'bg-gray-300';
    } else if (Alarma === false) {
        alarmaColor = 'bg-green-900';
    } else if (Alarma === true) {
        alarmaColor = 'bg-red-500';
    }

    return (
        <div className="max-w-sm mx-auto bg-secondary-content-bg shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center ">
                <div className="flex-1">
                    <p className="text-small font-medium text-center text-white">{titulo}</p>
                </div>
                <div className="flex-shrink-0 mt-2">
                    <LinkSpinner isLoading={alive} />
                </div>
            </div>

            {/* Descripción */}
            <div className="px-6 py-1 text-center">
                <h2>Progresiva</h2>
                {progresiva && <p className="text-sm text-white">{progresiva}</p>}
            </div>

            {/* Componente Barrera fuera del flex */}
            <div className="mx-auto flex justify-center">
                <Barrera estado={estado} width='250px' height='200px' />
            </div>

            {/* Grid de 3 posiciones */}
            <div className="grid grid-cols-1 py-2">
                <div className="inline-block flex align-items-left leading-3 mb-3 mr-1 text-white flex justify-center">
                    <div className={`h-3 w-3 mr-4 rounded-full ${panAbiertoColor}`} />
                    <h2>Pan abierto</h2>
                </div>
                <div className="inline-block flex align-items-left leading-3 mb-3 text-white flex justify-center">
                    <div className={`h-3 w-3 mr-4 rounded-full ${panCerradoColor}`} />
                    <h2>Pan cerrado</h2>
                </div>
                <div className="inline-block flex align-items-left leading-3 mr-8 text-white flex justify-center">
                    <div className={`h-4 w-4 mr-4 rounded-full ${alarmaColor}`} />
                    <h2>Alarmas</h2>
                </div>
            </div>
        </div>
    );
};

export default Tarjeta;
