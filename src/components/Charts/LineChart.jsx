import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Brush,
} from 'recharts';

function Linea() {
  const [data, setData] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [visibleLines, setVisibleLines] = useState({
    aGate90: true,
    aGate0: true,
    aGateControl: true,
    aGateBrokenArm: true,
    cv1: false,
    cv2: false,
    doorSensor: true,
    manualKey: true,
    chrgAlarm: true,
    aL1: true,
  });

  const yTickFormatter = (value) => {
    return value % 2 === 0 ? '0' : '1';
  };

  const valuePairs = [
    [2, 5],  // Para aGate90
    [8, 11], // Para aGate0
    [14, 17],// Para aGateControl
    [20, 23],// Para aGateBrokenArm
    [26, 29],// Para cv1
    [32, 35],// Para cv2
    [38, 41],// Para doorSensor
    [44, 47] // Para manualKey
];


  const lineColors = {
    aGate90: "#8884d8",
    aGate0: "#ff9600",
    aGateControl: "#00ff00",
    aGateBrokenArm: "#ff0000",
    cv1: "#0000ff",
    cv2: "#00ff00",
    doorSensor: "#ffff00",
    manualKey: "#00ffff",
    chrgAlarm: "#ff00ff",
    lineAlive: "#ff00ff",
    aL1: "#ff00ff",
    adc1: "#ff00ff",
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://15.228.48.3:8080/api/Estados/1');
      const result = await response.json();
  
      const formattedData = result.map((item, index) => ({
        idEstado: item.idEstado,
        horario: formatHorario(item.horario),
        aGate90: item.aGate90 ? valuePairs[0][0]:valuePairs[0][1],
        aGate0: item.aGate0 ? valuePairs[1][0]:valuePairs[1][1],
        aGateControl: item.aGateControl ? valuePairs[2][0]:valuePairs[2][1],
        aGateBrokenArm: item.aGateBrokenArm ? valuePairs[3][0]:valuePairs[3][1],
        cv1: item.cv1 ? valuePairs[4][0]:valuePairs[4][1] ,
        cv2: item.cv2 ? valuePairs[5][0]:valuePairs[5][1] ,
        doorSensor: item.doorSensor ? valuePairs[6][0]:valuePairs[6][1] ,
        manualKey: item.manualKey ? valuePairs[7][0]:valuePairs[7][1],
        chrgAlarm: item.chrgAlarm ? 1 : 0,
        aL1: item.aL1 ? 1 : 0,
        adc1: item.adc1 ? 1 : 0,
      }));
  
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formatHorario = (value) => {
    const date = new Date(value);
    return `${date.getHours()}:00`;
  };

  const handleToggleLine = (lineKey) => {
    setVisibleLines((prevVisibleLines) => ({
      ...prevVisibleLines,
      [lineKey]: !prevVisibleLines[lineKey],
    }));
  };

  return (
    <ResponsiveContainer width={'100%'} height={700}>
      <LineChart data={data} margin={{ top: 25, bottom: 5, right: 25 }}>
        <defs>
          {Object.keys(visibleLines).map((lineKey) => (
            <linearGradient key={lineKey} id={`lineGradient${lineKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: lineColors[lineKey], stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: lineColors[lineKey], stopOpacity: 0 }} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="" vertical="" />
        <XAxis dataKey="horario" tick={{ fill: "#fff" }} interval={0} />
        <YAxis dataKey="velocidad" tick={{ fill: "#fff" }} tickFormatter={yTickFormatter} tickCount={20} domain={[2,47]} yAxisId={0} orientation='left' />
        <Legend
          onClick={(e) => handleToggleLine(e.dataKey)}
          iconType="circle"
          iconSize={20}
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ fontSize: '18px' }}
        />
        {Object.keys(visibleLines).map((lineKey) => (
         <Line
         key={lineKey}
         type="step"
         dataKey={lineKey}
         stroke={visibleLines[lineKey] ? lineColors[lineKey] : `${lineColors[lineKey]}88`}
         strokeWidth="5"
         dot={false}
         activeDot={{ fill: "#2e4355", stroke: lineColors[lineKey], strokeWidth: 5, r: 10 }}
         hide={!visibleLines[lineKey]}
       />
        ))}
        <Brush
          dataKey="horario"
          height={30}
          stroke="#8884d8"
          fill="url(#lineGradient)"
          tick={{ fill: "#fff" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Linea;
