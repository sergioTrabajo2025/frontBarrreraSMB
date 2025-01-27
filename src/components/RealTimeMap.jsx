import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Opciones de estilo para el mapa
const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Hook personalizado para centrar el mapa y ajustar el zoom
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
};

const App = ({ id }) => {
  // Estado para la ubicación central del mapa
  const [center, setCenter] = useState([ -34.63130701063622, -58.38067694308318 ]);

  // Estado para el nivel de zoom del mapa
  const [zoom, setZoom] = useState(19);

  // Estado para almacenar datos de barreras
  const [barreras, setBarreras] = useState([]);
  
  // Estado para manejar errores al cargar barreras
  const [loadingError, setLoadingError] = useState(false);

  // Cargar los datos de las barreras desde la API
  useEffect(() => {
    const fetchBarrerasData = async () => {
      try {
        // Obtener datos de todas las barreras
        const responseBarreras = await fetch(import.meta.env.VITE_REACT_APP_BARRERA_URL);
        const barrerasData = await responseBarreras.json();
        setBarreras(barrerasData);

        // Si hay un ID de barrera proporcionado, centrar el mapa en esa barrera específica
        if (id) {
          const responseBarreraById = await fetch(`${import.meta.env.VITE_REACT_APP_BARRERA_URL}/${id}`);
          if (!responseBarreraById.ok) {
            throw new Error('Barrera not found');
          }
          const barreraByIdData = await responseBarreraById.json();
          setCenter([barreraByIdData.latitud, barreraByIdData.longitud]);
          setZoom(18);
        } else if (barrerasData.length > 0) {
          // Si no hay un ID, centrar el mapa en la primera barrera
          setCenter([barrerasData[0].latitud, barrerasData[0].longitud]);
        }
      } catch (error) {
        console.error("Error fetching barreras data:", error);
        setLoadingError(true);
      }
    };

    fetchBarrerasData();
  }, [id]);

  // Renderizar el componente del mapa
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={tileLayerUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Hook para cambiar la vista del mapa */}
        <ChangeView center={center} zoom={zoom} />
        {/* Renderizar marcadores para cada barrera */}
        {barreras.map(barrera => (
          <Marker
            key={barrera.idBarrera}
            position={[barrera.latitud, barrera.longitud]}
            icon={L.icon({
              iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              iconSize: [32, 32], // tamaño del icono
            })}
          >
            <Popup>{barrera.nombre}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
