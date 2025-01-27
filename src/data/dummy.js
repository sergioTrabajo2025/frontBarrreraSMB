import React from "react";

import EstadoFlota from "../data/Iconos/train_bn.png";
import IconoTiempoReal from "../data/Iconos/plot_bn.png";
import AlarmayEvento from "../data/Iconos/bell_bn.png";
import BobinasATS from "../data/Iconos/hand_bn.png";
import Ubicacion from "../data/Iconos/map_bn.png";

// Contiene los iconos y el nombre de los botones donde van a estar alojados las rutas para las redirecciones de la pagina
// Los iconos son extraíbles gratuitamente de https://react-icons.github.io/react-icons/

export const links = [
    {
        links: [
            {
                name: "Estado Barreras",
                icon: React.createElement('img', { src: EstadoFlota, height: "24", width: "24", style: { marginRight: "10px" } })
            },
            {
                name: "Tiempo Real",
                icon: React.createElement('img', { src: IconoTiempoReal, height: "18", width: "18" })
            },
            {
                name: "Alarma y Eventos",
                icon: React.createElement('img', { src: AlarmayEvento, height: "18", width: "18" })
            },
        ],
    },
    {
        links: [
            {
                name: "Análisis De Falla",
                icon: React.createElement('img', { src: BobinasATS, height: "24", width: "24" })
            },
            {
                name: "Ubicación",
                icon: React.createElement('img', { src: Ubicacion, height: "24", width: "24" })
            },
        ],
    },
];
