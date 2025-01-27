import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Definición del estilo y centro del mapa
const containerStyle = {
  width: "100%",
  height: "500px",
};
const center = {
  lat: -34.63130701063622,
  lng: -58.38067694308318,
};

// Opciones de estilo para el mapa
const options = {
  styles: [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#444444",
        },
      ],
    },
  ],
  mapId: "f9d9595bcb4705ca",
};

export const Map = (props) => {
  // Variables de estado para gestionar marcadores y el marcador seleccionado para mostrar información
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Hook useLoadScript para cargar la biblioteca de Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Ref para mantener los datos de marcadores anteriores para su comparación
  const prevMarkersRef = useRef([]);

  // Función para obtener datos de la URL especificada
  const fetchData = async () => {
    try {
      const response = await fetch(props.url);
      const data = await response.json();
      const newMarkers = data.map((Evento) => ({
        idEvento: Evento.idAlarmaDeEvento,
        position: {
          lat: Evento.latitud,
          lng: Evento.longitud,
          velocidad: Evento.velocidad,
          velocidadMaxima: Evento.velocidadMaxima,
          horario: Evento.horario.replace("T", " "),
        },
        title: <strong>{`${Evento.evento}`}</strong>,
      }));

      // Mantener solo los últimos 100 marcadores
      const last100Markers = newMarkers.slice(Math.max(newMarkers.length - 100, 0));

      // Comprobar si los nuevos datos de marcadores son diferentes a los datos de marcadores anteriores
      if (JSON.stringify(last100Markers) !== JSON.stringify(prevMarkersRef.current)) {
        setMarkers(last100Markers); // Actualizar el estado de marcadores
        prevMarkersRef.current = last100Markers; // Actualizar la referencia a los nuevos datos de marcadores
      }
    } catch (error) {
      console.log("Error al obtener datos", error);
    }
  };

  useEffect(() => {
    // Obtención de datos iniciales y configuración de un intervalo para actualizaciones periódicas de datos
    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar el componente
  }, [props.url]);

  // Función para manejar el clic en el marcador y mostrar la ventana de información
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return isLoaded && !loadError ? (
    <GoogleMap mapContainerStyle={containerStyle} zoom={10} center={center} options={options}>
      {markers.map((marker) => (
        <Marker
          key={marker.idEvento}
          position={marker.position}
          title={marker.title}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
          <div>
            <strong>{selectedMarker.title}</strong>
            <p>Latitud: {selectedMarker.position.lat.toFixed(6)}</p>
            <p>Longitud: {selectedMarker.position.lng.toFixed(6)}</p>
            <p>Velocidad: {selectedMarker.position.velocidad} Km/h</p>
            <p>Velocidad Máxima: {selectedMarker.position.velocidadMaxima} Km/h</p>
            <p>Horario: {selectedMarker.position.horario}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Cargando Mapa. Si esta acción toma demasiado tiempo, revisar la conexión de internet...</div>
  );
};

export default Map;
