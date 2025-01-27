import React, { useState, useEffect, useRef } from 'react';
import { PuertaAbierta, Electricidad, Luz, Campana, Manual, Engine, Charge, Gate90, Gate0, RoturaBrazo , CVia, Alert, TotalizadorBarrera} from "../components/Iconos";

/*Este componente junta varios estados de la plaqueta para graficar las alarmas correspondientes.
lo que hacemos es chequear los valores que vienen de la plaqueta y en base a eso asignarle las condiciones
a los iconos correspondientes
*/
const BarrierChecking = (groupMessage) => {
  console.log(groupMessage);

  //Totalizador de barrera 
  const imageSize = { width: '30px', height: '30px' }; // Ajusta el tamaño según sea necesario
  const valorTotalizador = ((groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 ? 1 : 0)) === 
    ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
    )&& ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
    ) ? '90' :


    ((groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0 ? 1 : 0)) === 
    ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
    )&& ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) +
    (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
    ) ? '0' : ' --'
    
  return (
    <div className="flex justify-items-center justify-center mb-2 gap-2">
   

{/*CONTROL UP, cualquiera que se active indicará arriba*/}
<div className="border border-black p-2 flex items-center justify-center">
        <Engine width={50} height={50} 
        fillup={

         // (groupMessage?.groupMessage?.tiempoReal[0]?.alarma16 & 0b01011101>0) ? '#ff0000' :
          (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_control || groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_control )? 
       ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_control )|| (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_control)?
                '#00FF00': //GRIS
                '#000000') : 
          '#808080'}
////////////////////////////////////////////////////////////
          fill90={// Si ambas señales 90 están inactivas, se muestra en gris
            (!groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 && !groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90) 
              ? '#808080' 
              : 
              (groupMessage?.groupMessage?.tiempoReal[0].alarma16 & 0b01010001) > 0 ? '#FF0000' ://si detecta falla 90
            // Si la suma de las señales 90 activas coincide con la suma de las señales 90 especificadas
            ((
              (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 ? 1 : 0)
            ) === (
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
            
            ) && (
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
            ) ) > 0 
              ? '#00FF00' 
              : 
            // Si ninguna de las condiciones anteriores se cumple, se muestra en gris
            '#000000'
          } 


          ////////////////////////////////////////////////////////////
          fill0={// Si ambas señales 90 están inactivas, se muestra en gris
            (!groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 && !groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0) 
              ? '#808080' 
              :
              (groupMessage?.groupMessage?.tiempoReal[0].alarma16 & 0b11101110) > 0 ? '#FF0000' : //si detecta falla 90

            // Si la suma de las señales 90 activas coincide con la suma de las señales 90 especificadas
            ((
              (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0 ? 1 : 0)
            ) === (
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
            
            ) && (
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) + 
              (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
            ) )> 0 
              ? '#00FF00' : 
            '#000000'
          } 

          /////////////////////////////////////
          strokebroken={// Si ambas señales 90 están inactivas, se muestra en gris
            (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_broken_arm || groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_broken_arm)? 
                '1':'0'
            
            //'#FF0000': //GRIS
              //  '#000000'
             }

             ////////////
fillbroken ={ (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_broken_arm || groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_broken_arm)? 
  '#FF0000':'#808080'
  
//'#FF0000': //GRIS
//  '#000000'
}
fill ={(groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 || groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0||groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 || groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90)>0? 
    '#000000':'#808080'
  
//'#FF0000': //GRIS
//  '#000000'
}
        />
          
      </div>

      <div className={`border border-black p-2 flex items-center justify-center`}>
      
      {/*CAMPANA*/}
      <Campana 
  width={50} 
  height={50} 
  fill={
    // Si hay alguna alarma activa en los bits específicos
    (groupMessage?.groupMessage?.tiempoReal[0]?.alarma17 & 0b11000000) > 0 
      ? '#808080' 
      : 
    // Si ambas campanas están inactivas, se muestra en gris
    (!groupMessage?.groupMessage?.tiempoReal[0]?.active_campana1 && !groupMessage?.groupMessage?.tiempoReal[0]?.active_campana2) 
      ? '#808080' 
      : 
    // Si la suma de las campanas activas coincide con la suma de las campanas especificadas
    (
      (groupMessage?.groupMessage?.tiempoReal[0]?.active_campana1 ? 1 : 0) + 
      (groupMessage?.groupMessage?.tiempoReal[0]?.active_campana2 ? 1 : 0)
    ) === (
      (groupMessage?.groupMessage?.tiempoReal[0]?.campana1 ? 1 : 0) + 
      (groupMessage?.groupMessage?.tiempoReal[0]?.campana2 ? 1 : 0)
    ) && (
      (groupMessage?.groupMessage?.tiempoReal[0]?.campana1 ? 1 : 0) + 
      (groupMessage?.groupMessage?.tiempoReal[0]?.campana2 ? 1 : 0)
    ) > 0 
      ? '#00FF00' 
      : 
    // Si ninguna de las condiciones anteriores se cumple, se muestra en gris
    '#000000'
  } 
/>


    </div>

    <div className="border border-black p-2 flex items-center justify-center">
      
      {/*LUCES*/}
      <Luz
  width={50}
  height={50}
  fill={
    // Si hay alguna alarma activa en los bits específicos de alarma18
    (groupMessage?.groupMessage?.tiempoReal[0]?.alarma18 & 0b00001111) > 0 
      ? '#ff0000' 
      : 
    // Si todos los estados de las luces están inactivos, se muestra en gris
    (
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_a &&
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_b &&
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_a &&
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_b
    ) 
      ? '#808080' 
      : 
    // Si la suma de las luces activas coincide con la suma de las luces especificadas
    (
      (
        (groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_a ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.active_l1_b ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_a ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.active_l2_b ? 1 : 0)
      ) === (
        (groupMessage?.groupMessage?.tiempoReal[0]?.l1_a ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.l1_b ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.l2_a ? 1 : 0) +
        (groupMessage?.groupMessage?.tiempoReal[0]?.l2_b ? 1 : 0)
      ) && (
        (
          (groupMessage?.groupMessage?.tiempoReal[0]?.l1_a ? 1 : 0) +
          (groupMessage?.groupMessage?.tiempoReal[0]?.l1_b ? 1 : 0) +
          (groupMessage?.groupMessage?.tiempoReal[0]?.l2_a ? 1 : 0) +
          (groupMessage?.groupMessage?.tiempoReal[0]?.l2_b ? 1 : 0)
        ) > 0
      )
    ) 
      ? '#00FF00' 
      : 
    // Si ninguna de las condiciones anteriores se cumple, se muestra en negro
    '#000000'
  }
/>

</div>
      <div className="border border-black p-2 flex items-center justify-center">

<CVia 
  width={50} 
  height={50} 
  fill={
    // Si hay alguna alarma activa en los bits específicos de alarma17
    (groupMessage?.groupMessage?.tiempoReal[0]?.alarma17 & 0b00011100) > 0 
      ? '#ff0000' 
      : 
    // Si todos los estados de CV están inactivos, se muestra en gris
    (
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_cv1 &&
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_cv2 &&
      !groupMessage?.groupMessage?.tiempoReal[0]?.active_cv3
    ) 
      ? '#808080' 
      : 
    // Si cualquiera de los CV especificados está activo
    (
      groupMessage?.groupMessage?.tiempoReal[0]?.cv1 &&
      groupMessage?.groupMessage?.tiempoReal[0]?.cv2 ||
      groupMessage?.groupMessage?.tiempoReal[0]?.cv3
    ) 
      ? '#00ff00' 
      : 
    // Si ninguna de las condiciones anteriores se cumple, se muestra en negro
    '#000000'
  }
/>

</div>

<div>
    <Gate0 
  width={50} 
  height={50} 
  
  />
  </div>

      
      {/*PUERTA ABIERTA*/}
      <div className=""></div>
      <div className="border border-black p-2 flex items-center justify-center">
        <PuertaAbierta width={50} height={50} fill={groupMessage?.groupMessage?.tiempoReal[0]?.active_door_sensor ? 
          (groupMessage?.groupMessage?.tiempoReal[0]?.door_sensor ? '#000000' : '#808080') 
          : '#808080'} />
        </div>




            {/*CARGADOR*/}

      <div className="border border-black p-2 flex items-center justify-center">
          <Charge width={50} height={50} fill={groupMessage?.groupMessage?.tiempoReal[0]?.active_chrg_alarm ?
          (groupMessage?.groupMessage?.tiempoReal[0]?.chrg_alarm ? '#FFA500': '#000000' ) : '#808080'} />
      </div>
    
      <div className="border border-black p-2 flex items-center justify-center">

        {/*LINE ALIVE*/ }
        <Electricidad width={50} height={50} fill={groupMessage?.groupMessage?.tiempoReal[0]?.active_line_alive ? (groupMessage?.groupMessage?.tiempoReal[0]?.line_alive ? '#000000' : '#ff0000') : '#808080'} />
      </div>
      <div className="border border-black p-2 flex items-center justify-center">
       {/*ALARM KEY */}
        <Manual width={50} height={50} fill={groupMessage?.groupMessage?.tiempoReal[0]?.active_manual_key ? (groupMessage?.groupMessage?.tiempoReal[0]?.manual_key ? '#000000':'#808080' ) : '#808080'} />
      </div>
      
      
     

      {/*90 grados*/}
      <Gate0 
  width={50} 
  height={50} 
  fill={
{/*
    ((groupMessage?.groupMessage?.tiempoReal[0]?.alarma16 & 0b01010101)>0) ?'#ff0000': /*colocar en binario las alarmas involucradas
    (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 === false &&
      groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 === false) ? '#808080' :

      (((groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_90 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_90 ? 1 : 0)) === 
      ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
      )&& ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_90 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_90 ? 1 : 0)
      )>0) ? '#00FF00' :
     '#000000'
    */}
  } 
/>



       <div className="border border-black p-2 flex items-center justify-center">

<Alert width={50} height={50} fill=
      {
      ((groupMessage?.groupMessage?.tiempoReal[0]?.alarma17 & 0b10011111||groupMessage?.groupMessage?.tiempoReal[0]?.alarma16 & 0b10001001||groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_broken_arm ? 1 : 0||groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_broken_arm ? 1 : 0)> 0) ?'#ff0000':   /*colocar en binario las alarmas involucradas*/
          '#000000'
      }
       />
</div>
      {/*0 grados*/}
<Gate0 

  width={50} 
  height={50} 
  fill={
   {/* ((groupMessage?.groupMessage?.tiempoReal[0]?.alarma16 & 0b01100110 )>0) ?'#ff0000':   /*colocar en binario las alarmas involucradas
    (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 === false &&
      groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0 === false) ? '#808080' :

      (((groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_A_0 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.active_gate_B_0 ? 1 : 0)) === 
      ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
      )&&
      ((groupMessage?.groupMessage?.tiempoReal[0]?.gate_A_0 ? 1 : 0) +
      (groupMessage?.groupMessage?.tiempoReal[0]?.gate_B_0 ? 1 : 0)
      )>0
      ) ? '#00FF00' :
    '#000000' */}
  } 


/>
</div>
      
  );
};

export default BarrierChecking;
