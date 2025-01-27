import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useAppContext } from '../contexts/TramaProvider';
import MainResumeSpeedometer from './MainResumeSpeedometer';
import EMU from "../data/Locomotora.png";
import LinkSpinner from "./Spinners/LinkSpinner";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//Deprecado!


const TiempoRealComponent = () => {
  const { message, isConnected, connection, enviarMensajeBackend } = useAppContext();
  const [formacionGroups, setFormacionGroups] = useState({});

  const handleNewMessage = useCallback(() => {
    if (message) {
      setFormacionGroups((prevFormacionGroups) => {
        const { IdFormacion, tiempoReal } = message;
        const horario = tiempoReal.length > 0 ? tiempoReal[tiempoReal.length - 1].horario : 'Sin datos';
        const velocidad = tiempoReal.length > 0 ? tiempoReal[tiempoReal.length - 1].velocidad : 'Sin datos';
        const auxiliarStatus = tiempoReal.length > 0 ? tiempoReal[tiempoReal.length - 1].auxiliarStatus : undefined;
        const auxiliarAts = tiempoReal.length > 0 ? tiempoReal[tiempoReal.length - 1].auxiliarAts : undefined;
        const isConnected = tiempoReal.length > 0 ? tiempoReal[tiempoReal.length - 1].isConnected : undefined;
        return {
          ...prevFormacionGroups,
          [IdFormacion]: [
            {
              horario,
              isConnected,
              velocidad,
              auxiliarStatus,
              auxiliarAts,
              color: IdFormacion % 2 === 0 ? '#e6e6e6' : '#4CAF50',
              text: `${IdFormacion}: ${horario}`,
            },
          ],
        };
      });
    }
  }, [message]);

  useEffect(() => {
    handleNewMessage();
  }, [handleNewMessage]);

  const tableData = Object.keys(formacionGroups).map((formacionId) => ({
    imagen: <img src={EMU} alt="EMU" style={{ width: '150px', height: '120px' }} />,
    idFormacion: formacionId,
    horario: formacionGroups[formacionId][0].horario,
    velocidad: formacionGroups[formacionId][0].velocidad,
    auxStatus: (
      formacionGroups[formacionId][0].auxiliarStatus !== undefined && (
        <>
          {formacionGroups[formacionId][0].auxiliarStatus  === 1 && (
            <CheckCircleIcon style={{ color: 'green' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarStatus  === 0 && (
            <CheckCircleIcon style={{ color: 'grey' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarStatus  === 2 && (
            <CheckCircleIcon style={{ color: 'yellow' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarStatus  === 3 && (
            <CheckCircleIcon style={{ color: 'red' }} />
          )}
        </>
      )
    ),
    auxAts: (
      formacionGroups[formacionId][0].auxiliarAts !== undefined && (
        <>
          {formacionGroups[formacionId][0].auxiliarAts  === 1 && (
            <CheckCircleIcon style={{ color: 'green' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarAts  === 0 && (
            <CheckCircleIcon style={{ color: 'grey' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarAts  === 2 && (
            <CheckCircleIcon style={{ color: 'yellow' }} />
          )}
          {formacionGroups[formacionId][0].auxiliarAts  === 3 && (
            <CheckCircleIcon style={{ color: 'red' }} />
          )}
        </>
      )
    ),
    speedometer: <MainResumeSpeedometer speed={formacionGroups[formacionId][0].velocidad} />,
    estado: <LinkSpinner isLoading={formacionGroups[formacionId][0].isConnected}/>, 
  }));
  

  const columns = [
    { name: 'Imagen', selector: 'imagen', sortable: false, center: true },
    { name: 'ID Formacion', selector: 'idFormacion', sortable: true, center: true },
    { name: 'Horario', selector: 'horario', sortable: true, center: true },
    { name: 'Velocímetro', selector: 'speedometer', sortable: false, center: true },
    { name: 'Status', selector: 'auxStatus', sortable: false, center: true },
    { name: 'Ats', selector: 'auxAts', sortable: false, center: true },
    { name: 'Estado', selector: 'estado', sortable: false, center: true },
  ];

  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <DataTable
          className="data-table"
          columns={columns}
          data={tableData}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          highlightOnHover
        />
      </div>
    </>
  );
};

export default TiempoRealComponent;
