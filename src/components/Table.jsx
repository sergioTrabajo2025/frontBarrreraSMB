import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ endpoint, columns, localStorageKey }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [exporting, setExporting] = useState(false);

  const updateLocalStorage = (newData) => {
    // Solo guarda los primeros 5000 resultados
    const dataToStore = newData.slice(0, 5000);
    localStorage.setItem(localStorageKey, JSON.stringify(dataToStore));
  };

  const fetchData = useCallback(async () => {
    if (!autoRefresh) {
      setLoading(true);
    }
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      const newData = responseData.map((row) => {
        const transformedRow = Object.keys(row).reduce((acc, key) => {
          acc[key] = row[key] === true ? 1 : row[key] === false ? 0 : row[key];
          return acc;
        }, {});
        return {
          ...transformedRow,
          latitud: parseFloat(transformedRow.latitud).toFixed(6),
          longitud: parseFloat(transformedRow.longitud).toFixed(6),
        };
      });

      // Actualiza local storage con los últimos 5000 registros
      updateLocalStorage(newData);

      setOriginalData(newData);
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (!autoRefresh) {
        setLoading(false);
      }
    }
  }, [endpoint, localStorageKey, autoRefresh]);

  useEffect(() => {
    const loadData = () => {
      const storedData = JSON.parse(localStorage.getItem(localStorageKey));
      if (storedData && storedData.length > 0) {
        setOriginalData(storedData);
        setData(storedData);
      } else {
        fetchData(); // Llama a fetchData si no hay datos en local storage
      }
    };

    loadData(); // Cargar datos al iniciar
  }, [localStorageKey, fetchData]);

  useEffect(() => {
    let intervalId;

    if (autoRefresh) {
      const updateData = async () => {
        await fetchData ();
        intervalId = setInterval(async () => {
          await fetchData();
        }, 10000);
      };

      updateData(); // Inicializa la primera carga

      // Limpiar interval cuando se desactiva el auto-refresh
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh, fetchData]);

  useEffect(() => {
    if (filterText) {
      const filteredData = originalData.filter((row) => {
        return Object.values(row).some(
          (val) => val && val.toString().toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setData(filteredData);
    } else {
      setData(originalData);
    }
  }, [filterText, originalData]);

  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  const handleAutoRefreshChange = (e) => {
    setAutoRefresh(e.target.checked);
  };

  const customTitle = (
      <div >
        <input
          id="filter"
          type="text"
          value={filterText}
          onChange={handleSearch}
          placeholder="Buscar..."
        />      
        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={handleAutoRefreshChange}
          />
          Actualizacion Automática
        </label>
      </div>
  );

  const downloadCSV = async () => {
    setExporting(true); // Deshabilitar el botón
  
    try {
      const response = await fetch(`${endpoint}`); // Ajusta la URL aquí
  
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
  
      const data = await response.json();
  
      const rawData = data.map((item) => {
        const transformedItem = Object.keys(item).reduce((acc, key) => {
          acc[key] = item[key] === true ? 1 : item[key] === false ? 0 : item[key];
          return acc;
        }, {});
        return {
          ...transformedItem,
        };
      });
  
      // Reemplazar los puntos por comas en valores decimales
      const formatNumber = (num) => {
        return typeof num === 'number' ? num.toString().replace('.', ',') : num;
      };
  
      // Crear contenido CSV
      const csvContent = "data:text/csv;charset=utf-8,";
  
      const headerRow = Object.keys(rawData[0]);
      const csvRows = rawData.map((item) =>
        headerRow.map((col) => formatNumber(item[col])).join(";") // Usar punto y coma
      );
  
      const csvFullContent = csvContent + [headerRow.join(";"), ...csvRows].join("\n"); // Usar punto y coma
  
      const encodedUri = encodeURI(csvFullContent);
  
      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = "DatosExportados.csv";
  
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al obtener datos para la exportación CSV:', error);
    } finally {
      setExporting(false); // Habilitar el botón
    }
  };
  
  return (
    <div className="tabla-contenedor  ">
      <DataTable
        title={customTitle}
        columns={columns}
        data={data}
        pagination
        paginationPerPage={15}
        paginationRowsPerPageOptions={[15, 30, 50]}
        highlightOnHover
        actions={[
          <button
            key="export-csv"
            onClick={downloadCSV}
            className="export-btn"
            disabled={exporting}
          >
            {exporting ? 'Exportando...' : 'Exportar a CSV'}
          </button>,
        ]}
        progressPending={loading && !autoRefresh}
      />
    </div>
  );
  
};

export default Table;
