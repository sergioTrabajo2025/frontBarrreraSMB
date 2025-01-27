import React from 'react';
import { RealTimeMap } from '../../components';
import { useParams } from 'react-router-dom';

const IdUbicacionPage = () => {
  // Obtener el parámetro de la URL
  const { idBarrera } = useParams();

  return (
    <div>
      <div className="p-6 dark:bg-secondary-dark-bg rounded-3xl">
        <div className="bg-page-title-background text-white text-2xl text-gotham p-4">Ubicación</div>
        <RealTimeMap id={idBarrera}></RealTimeMap>
      </div>
    </div>
  );
};

export default IdUbicacionPage;
