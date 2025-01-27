import React from 'react';

const Destellador = (Destello,width,height) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    viewBox="0 0 124 124"
    fill="none"
    
  >
    <rect
      width={width}
      height={height}
      stroke="black"
      strokeWidth={4}
      fill="transparent"
    />
    <line x1={5} y1={62} x2={40} y2={62} stroke="#808080" strokeWidth={8} />
    <line x1={80} y1={62} x2={120} y2={62} stroke="#808080" strokeWidth={8} />
    <line x1={62} y1={5} x2={62} y2={40} stroke="#808080" strokeWidth={8} />
    <line x1={62} y1={80} x2={62} y2={120} stroke="#808080" strokeWidth={8} />
    <line
      x1={10}
      y1={10}
      x2={40}
      y2={40}
      stroke={Destello.Destello}
      
      strokeWidth={10}
      strokeLinecap="round"
    />
    <line
      x1={114}
      y1={10}
      x2={84}
      y2={40}
      stroke={Destello.Destello}
      strokeWidth={10}
      strokeLinecap="round"
    />
    <line
      x1={114}
      y1={114}
      x2={84}
      y2={84}
      stroke={Destello.Destello}
      strokeWidth={10}
      strokeLinecap="round"
    />
    <line
      x1={10}
      y1={114}
      x2={40}
      y2={84}
      stroke={Destello.Destello}
      strokeWidth={10}
      strokeLinecap="round"
    />
 
  </svg>
  );
};

export default Destellador;
