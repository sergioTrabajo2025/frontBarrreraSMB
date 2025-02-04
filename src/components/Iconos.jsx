import * as React from "react";

export const PuertaAbierta = ({ width, height,fill, ...props }) => (
    <svg
      fill="none"
      height={height}
      viewBox="0 -10 70 150"
      width={width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M0,115.27h4.39V1.99V0h1.99h82.93h1.99v1.99v113.28h5.14v7.61H0V115.27L0,115.27z M13.88,8.32H81.8h0.83v0.83 v104.89h4.69V3.97H8.36v111.3h4.69V9.15V8.32H13.88L13.88,8.32z M15.94,114.04H75.1l-0.38-0.15l-27.76-3.79V33.9l32.79-20.66v-2.04 H15.94V114.04L15.94,114.04z M51.7,59.66l4.23-1.21v15.81l-4.23-1.53V59.66L51.7,59.66z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );

  export const Bateria = ({ width, height, ...props }) => (
    <svg
      fill="none"
      height={height}
      viewBox="200 -10 40 600"
      width={width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M73 81v46h46V81H73zm320 0v46h46V81h-46zM25 145v16h462v-16H25zm0 34v252h462V179H25zm382 21h18v23h23v18h-23v23h-18v-23h-23v-18h23v-23zM64 223h64v18H64v-18z"
        fill="#808080"
        fillRule="evenodd"
      />
    </svg>
  );

  export const Electricidad = ({ width, height, fill }) => (
    <svg
      fill="none"
      height={height}
      viewBox="200 0 40 600"
      width={width}
      
    >
      <path
        clipRule="evenodd"
        d="M369.533,177.027h-67.716L367.744,0h-218.25l-37.056,288.551h73.68l-32.431,208.975 c-0.899,5.808,2.342,11.453,7.805,13.606c5.472,2.144,11.686,0.216,14.98-4.642l223.09-329.462H369.533z M198.384,417.302 l24.92-160.612h-74.649l28.879-224.828h144.344l-65.926,177.027h83.56L198.384,417.302z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );

  export const Luz = ({ width, height, fill}) => (
    <svg
      fill="none"
      height={height}
      viewBox="-5 0 40 30"
      width={width}

    >
      <path
        clipRule="evenodd"
        d="M20 25.25h-8c-0.414 0-0.75 0.336-0.75 0.75v0 2c0 0 0 0 0 0 0 0.207 0.084 0.395 0.22 0.531v0l2 2c0.135 0.135 0.322 0.219 0.529 0.219 0.001 0 0.001 0 0.002 0h4c0 0 0.001 0 0.002 0 0.207 0 0.394-0.084 0.53-0.219l2-2c0.135-0.136 0.219-0.323 0.219-0.53 0-0.001 0-0.001 0-0.002v0-2c-0-0.414-0.336-0.75-0.75-0.75v0zM19.25 27.689l-1.561 1.561h-3.379l-1.561-1.561v-0.939h6.5zM24.951 6.622c-1.828-3.111-5.083-5.213-8.842-5.408l-0.027-0.001h-0.067c-3.759 0.165-7.009 2.202-8.857 5.197l-0.027 0.047c-1.12 1.611-1.789 3.609-1.789 5.763 0 0.006 0 0.011 0 0.017v-0.001c0.175 2.207 0.89 4.217 2.012 5.937l-0.030-0.049c0.319 0.549 0.657 1.090 0.996 1.631 0.686 1.012 1.341 2.175 1.9 3.392l0.063 0.153c0.117 0.273 0.383 0.461 0.692 0.461h0c0.001 0 0.003 0 0.004 0 0.103 0 0.201-0.022 0.29-0.060l-0.005 0.002c0.273-0.116 0.461-0.382 0.461-0.692 0-0.104-0.021-0.203-0.060-0.294l0.002 0.005c-0.658-1.454-1.35-2.688-2.135-3.855l0.059 0.093c-0.33-0.527-0.659-1.054-0.971-1.59-0.982-1.464-1.624-3.232-1.777-5.138l-0.002-0.038c0.015-1.841 0.591-3.544 1.566-4.95l-0.019 0.029c1.603-2.629 4.391-4.397 7.603-4.56l0.023-0.001h0.056c3.255 0.191 6.045 2.013 7.582 4.655l0.024 0.045c0.911 1.371 1.453 3.055 1.453 4.865 0 0.060-0.001 0.12-0.002 0.18l0-0.009c-0.223 1.924-0.883 3.659-1.878 5.152l0.027-0.043c-0.289 0.49-0.592 0.975-0.895 1.457-0.704 1.048-1.391 2.257-1.986 3.518l-0.073 0.171c-0.039 0.087-0.061 0.19-0.061 0.297 0 0.414 0.336 0.75 0.75 0.75 0.305 0 0.568-0.182 0.685-0.444l0.002-0.005c0.633-1.354 1.285-2.498 2.015-3.585l-0.060 0.095c0.309-0.494 0.619-0.99 0.916-1.492 1.090-1.643 1.825-3.612 2.050-5.733l0.005-0.057c0.003-0.090 0.005-0.196 0.005-0.303 0-2.087-0.627-4.027-1.702-5.643l0.023 0.037zM14.684 5.893c-0.122-0.262-0.383-0.44-0.685-0.44-0.111 0-0.217 0.024-0.312 0.067l0.005-0.002c-2.316 1.342-3.961 3.621-4.424 6.306l-0.008 0.054c-0.006 0.037-0.010 0.079-0.010 0.122 0 0.371 0.269 0.678 0.622 0.74l0.004 0.001c0.037 0.006 0.079 0.010 0.123 0.010 0.001 0 0.002 0 0.002 0h-0c0.37-0 0.677-0.268 0.738-0.621l0.001-0.004c0.397-2.232 1.714-4.097 3.536-5.22l0.033-0.019c0.262-0.12 0.442-0.381 0.442-0.683 0-0.112-0.025-0.218-0.068-0.313l0.002 0.005zM1.665 2.671l4 2c0.098 0.050 0.213 0.079 0.335 0.079 0.414 0 0.75-0.336 0.75-0.75 0-0.292-0.167-0.545-0.411-0.669l-0.004-0.002-4-2c-0.098-0.050-0.213-0.079-0.335-0.079-0.414 0-0.75 0.336-0.75 0.75 0 0.292 0.167 0.545 0.411 0.669l0.004 0.002zM26 4.75c0 0 0 0 0.001 0 0.122 0 0.238-0.029 0.34-0.081l-0.004 0.002 4-2c0.248-0.126 0.414-0.379 0.414-0.671 0-0.414-0.336-0.75-0.75-0.75-0.122 0-0.238 0.029-0.34 0.081l0.004-0.002-4 2c-0.247 0.126-0.413 0.379-0.413 0.67 0 0.414 0.335 0.75 0.749 0.75h0zM30.336 21.33l-4-2c-0.097-0.049-0.212-0.078-0.333-0.078-0.414 0-0.749 0.336-0.749 0.749 0 0.29 0.165 0.542 0.406 0.666l0.004 0.002 4 2c0.097 0.050 0.212 0.080 0.334 0.080 0.001 0 0.001 0 0.002 0h-0c0.414-0 0.75-0.336 0.75-0.75 0-0.291-0.166-0.544-0.409-0.668l-0.004-0.002zM5.772 19.32l-3.913 1.83c-0.258 0.122-0.433 0.381-0.433 0.68 0 0.414 0.336 0.75 0.75 0.75 0 0 0 0 0 0h-0c0.115-0 0.224-0.026 0.322-0.072l-0.005 0.002 3.913-1.83c0.26-0.122 0.436-0.381 0.436-0.681 0-0.414-0.336-0.75-0.75-0.75-0.117 0-0.227 0.027-0.325 0.074l0.005-0.002zM2 12.75h1c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-1c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM30 11.25h-1c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );

  export const Campana = ({ width, height,fill,props }) => (
    <svg
      fill="none"
      height={height}
      viewBox="-5 0 30 25"
      width={width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.1657 2.14424C12.8728 2.50021 13 3.27314 13 3.7446V20.2561C13 20.7286 12.8717 21.4998 12.1656 21.8554C11.416 22.2331 10.7175 21.8081 10.3623 21.4891L4.95001 16.6248H3.00001C1.89544 16.6248 1.00001 15.7293 1.00001 14.6248L1 9.43717C1 8.3326 1.89543 7.43717 3 7.43717H4.94661L10.3623 2.51158C10.7163 2.19354 11.4151 1.76635 12.1657 2.14424ZM11 4.63507L6.00618 9.17696C5.82209 9.34439 5.58219 9.43717 5.33334 9.43717H3L3.00001 14.6248H5.33334C5.58015 14.6248 5.81823 14.716 6.00179 14.881L11 19.3731V4.63507Z" fill={fill}></path> <path d="M16.0368 4.73124C16.1852 4.19927 16.7368 3.88837 17.2688 4.03681C20.6116 4.9696 23 8.22106 23 12C23 15.779 20.6116 19.0304 17.2688 19.9632C16.7368 20.1117 16.1852 19.8007 16.0368 19.2688C15.8884 18.7368 16.1993 18.1852 16.7312 18.0368C19.1391 17.3649 21 14.9567 21 12C21 9.04332 19.1391 6.63512 16.7312 5.96321C16.1993 5.81477 15.8884 5.2632 16.0368 4.73124Z" fill={fill}></path> <path d="M16.2865 8.04192C15.7573 7.88372 15.2001 8.18443 15.0419 8.71357C14.8837 9.24271 15.1844 9.79992 15.7136 9.95812C16.3702 10.1544 17 10.9209 17 12C17 13.0791 16.3702 13.8456 15.7136 14.0419C15.1844 14.2001 14.8837 14.7573 15.0419 15.2865C15.2001 15.8156 15.7573 16.1163 16.2865 15.9581C17.9301 15.4667 19 13.8076 19 12C19 10.1924 17.9301 8.53333 16.2865 8.04192Z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );

  export const Manual = ({ width, height, fill }) => (
    
    
    <svg
      fill="none"
      height={height}
      viewBox="200 0 30 500"
      width={width}
      
    >
      <path
        clipRule="evenodd"
        d="M367.5,128h-89.99l5.692-72.102c1.134-14.363-3.824-28.668-13.602-39.249C259.822,6.068,245.95,0,231.457,0 C217.05,0,203.178,6.068,193.4,16.649c-9.778,10.581-14.736,24.886-13.602,39.249L185.49,128H95.5C78.131,128,64,142.131,64,159.5 v272c0,17.369,14.131,31.5,31.5,31.5h272c17.369,0,31.5-14.131,31.5-31.5v-272C399,142.131,384.869,128,367.5,128z M264.865,288.165l3.595-45.539C285.631,254.606,296,274.176,296,295.5c0,35.565-28.935,64.5-64.5,64.5S167,331.065,167,295.5 c0-21.41,10.351-40.918,27.539-52.881l3.596,45.546C199.5,305.456,214.155,319,231.5,319S263.5,305.456,264.865,288.165z M193.213,225.817C167.709,239.816,152,266.215,152,295.5c0,43.836,35.664,79.5,79.5,79.5s79.5-35.664,79.5-79.5 c0-29.17-15.741-55.674-41.213-69.678l1.443-18.279C305.514,223.022,328,257.329,328,295.5c0,53.21-43.29,96.5-96.5,96.5 S135,348.71,135,295.5c0-38.227,22.471-72.482,56.77-87.957L193.213,225.817z M204.416,26.83c7.05-7.629,16.653-11.83,27.127-11.83 c10.388,0,19.991,4.201,27.041,11.83c7.05,7.628,10.482,17.533,9.665,27.888l-18.337,232.267 C249.159,296.526,241.071,304,231.5,304s-17.659-7.474-18.412-17.016L194.751,54.718C193.934,44.363,197.366,34.458,204.416,26.83z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );

    export const Engine = ({ width, height, fill,fill90,fill0,fillup,fillbroken,strokebroken }) => (
     // <svg viewBox="0 0 24 24"  height={height} width={width}fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" textAnchor="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3L21 10L16.0104 10L16 21L8 21L8 10L3 10L12 3Z" stroke={fill} strokeWidth="2" strokeLinecap="round" textAnchor="round"></path> </g></svg>
<svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 507.996 507.996">
  <circle cx="66.3" cy="262.679" r="13.3"/>
  <path d="m506.4 75.179-35.5-67.6c-3.6-6.9-12.1-9.6-19-5.9l-355.8 186.3c-9-4.6-19.1-7.2-29.8-7.2-36.6 0-66.3 29.8-66.3 66.3v246.8c0 7.8 6.3 14.1 14.1 14.1h104.3c7.8 0 14.1-6.3 14.1-14.1v-206.8l367.9-192.8c6.9-3.6 9.6-12.1 6-19.1m-478.2 404.6v-232.7c0-21 17.1-38 38-38 21 0 38 17.1 38 38v232.7zm116.3-230.8-12 6.3v-8.1c0-14.9-4.9-28.5-13.1-39.5l26.6-13.9-1.8 55.2zm67.5-35.4-39.1 20.5 1.8-55.4 39.1-20.5zm72.7-38-44 23 1.8-55.4 44-23zm72.6-38.1-43.9 23 1.7-55.4 44-23zm72.6-38.1-44 23 1.9-55.4 43.9-23zm28.8-15.1 1.2-37 15 28.5z"/>
  
<text x="230" y="480" fontFamily="Arial" fill={fill0} font-size="150">0</text>
<text x="10" y="120" fontFamily="Arial" fill={fill90} font-size="150">90</text>

<line x1="0" y1="500" x2="507.996" y2="6" stroke={fillbroken} stroke-width="20"stroke-opacity={strokebroken}/>

  <path d="M253.998,50 L273.998,70 L263.998,70 L263.998,120 L243.998,120 L243.998,70 L233.998,70 Z" 
        fill={fillup} transform="translate(-220, 140) scale(2.5)" stroke={fillup} stroke-width="5"/>
  
</svg>

  )
    export const Charge = ({ width, height, fill }) => (
    <svg
      fill="none"
      height={height}
      viewBox="0 10 20 1"
      width={width}
      
    >
      <path
        clipRule="evenodd"
          d="m1,2l0,3l-1,0l0,1l0,2l2,2l0,1l1,0l0,6l1,0l0,-6l1,0l0,-1l2,-2l0,-2l0,-1l-1,0l0,-3l-1,0l0,3l-3,0l0,-3l-1,0zm0,4l5,0l0,1.59l-2,2l0,0.41l-1,0l0,-0.41l-2,-2l0,-1.59zm7,0l0,1l10,0l0,2l1,1l0,2l-1,1l0,2l-13,0l0,1l14,0l0,-2.5l1,-1l0,-3l-1,-1l0,-2.5l-11,0zm0,2l0,6l1,0l0,-6l-1,0zm2,0l0,6l1,0l0,-6l-1,0zm2,0l0,6l1,0l0,-6l-1,0zm-12,1.5l0,6.5l2,0l0,-1l-1,0l0,-4.5l-1,-1zm7,0l-1,1l0,3.5l1,0l0,-4.5z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  );


  export const Via = ({ width, height, cv1,cv2,cv3 }) => (
    <svg width={width} height={height} viewBox="0 0 1400 80" xmlns="http://www.w3.org/2000/svg">
      {/* Carril */}
      <rect x="0" y="10" width={"28%"} height="20" fill={cv1} />
      <rect x="400" y="10" width={"42%"} height="20" fill={cv3} />
      <rect x="995" y="10" width={"100%"} height="20" fill={cv2} />
    </svg>
  );
  
  export const Gate90 = ({ width, height,fill }) => (
    <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" fontSize="100" textAnchor="middle">90</text>
  <line x1="30" y1="170" x2="170" y2="30" stroke={fill} strokeWidth="4"/>
  <line x1="170" y1="170" x2="30" y2="30" stroke={fill} strokeWidth="4"/>
</svg>

  );
  
  export const Gate0 = ({ width, height,fill }) => (
    <svg width={width} height={height} viewBox="0 0 200 200" >
  <text x="50%" y="50%" fontSize="100" textAnchor="middle"></text>
  <line x1="30" y1="170" x2="200" y2="30" stroke={fill} strokeWidth="2"/>
  <line x1="170" y1="170" x2="30" y2="30" stroke={fill} strokeWidth="2"/>
</svg>
  );

  export const TotalizadorBarrera = ({ width, height,fill,valor=90,valueFill="red" }) => (
<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 507.996 507.996">
  <circle cx="66.3" cy="262.679" r="13.3"/>
  <path d="m506.4 75.179-35.5-67.6c-3.6-6.9-12.1-9.6-19-5.9l-355.8 186.3c-9-4.6-19.1-7.2-29.8-7.2-36.6 0-66.3 29.8-66.3 66.3v246.8c0 7.8 6.3 14.1 14.1 14.1h104.3c7.8 0 14.1-6.3 14.1-14.1v-206.8l367.9-192.8c6.9-3.6 9.6-12.1 6-19.1m-478.2 404.6v-232.7c0-21 17.1-38 38-38 21 0 38 17.1 38 38v232.7zm116.3-230.8-12 6.3v-8.1c0-14.9-4.9-28.5-13.1-39.5l26.6-13.9-1.8 55.2zm67.5-35.4-39.1 20.5 1.8-55.4 39.1-20.5zm72.7-38-44 23 1.8-55.4 44-23zm72.6-38.1-43.9 23 1.7-55.4 44-23zm72.6-38.1-44 23 1.9-55.4 43.9-23zm28.8-15.1 1.2-37 15 28.5z"/>
  <text x="190" y="500" fontFamily="Arial" fill={valueFill} fontSize="300">{valor}</text>
</svg>
  );

  export const CVia = ({ height, width, fill }) => (
    <svg width={width} height={height} viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
      {/* Definición de sombra */}
      <defs>
        <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      
      {/* Texto con sombra */}
      <g filter="url(#dropshadow)">
        <text x="111" y="49" fontFamily="Arial" fontSize="140" fill="#000000" textAnchor="middle">Vía</text>
        <text x="110" y="148" fontFamily="Arial" fontSize="100" fill="#000000" textAnchor="middle">Libre</text>
      </g>
      
      {/* Texto principal */}
      <text x="110" y="40" fontFamily="Arial" fontSize="140" fill={fill} textAnchor="middle">Vía</text>
      <text x="110" y="140" fontFamily="Arial" fontSize="100" fill={fill} textAnchor="middle">Libre</text>
    </svg>
  );

  export const Alert = ({ width,height,fill }) => (
<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 10V13" stroke={fill} strokeWidth="2" strokeLinecap="round"/>
<path d="M12 16V15.9888" stroke={fill} strokeWidth="2" strokeLinecap="round"/>
<path d="M10.2518 5.147L3.6508 17.0287C2.91021 18.3618 3.87415 20 5.39912 20H18.6011C20.126 20 21.09 18.3618 20.3494 17.0287L13.7484 5.147C12.9864 3.77538 11.0138 3.77538 10.2518 5.147Z" stroke={fill} strokeWidth="2" strokeLinecap="round" textAnchor="round"/>
</svg>  );
    
    


  export const RoturaBrazo = ({ width, height,fill }) => (
    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"  width={width} height={height} viewBox="0 0 512 512"  fill={fill}>

<g id="SVGRepo_bgCarrier" strokeWidth="0"/>

<g id="SVGRepo_tracerCarrier" strokeLinecap="round" textAnchor="round"/>

<g id="SVGRepo_iconCarrier"> <style type="text/css">   </style> <g> <path class="st0" d="M257.709,254.287c-11.313-11.359-24.547-19.984-38.625-25.688c-21.141-8.578-44.172-10.688-66.25-6.422 c-22.047,4.266-43.297,15.063-60.297,32.109l-36.563,36.484l-21.75,21.813C22.85,323.943,14.24,337.146,8.553,351.224 c-8.578,21.141-10.672,44.156-6.406,66.266c4.25,22.031,15.016,43.297,32.078,60.313c11.328,11.328,24.563,19.938,38.656,25.625 c21.141,8.578,44.141,10.719,66.203,6.422c22.078-4.219,43.313-15.031,60.328-32.047l58.297-58.344 c11.359-11.297,19.969-24.563,25.672-38.657c8.563-21.109,10.703-44.141,6.438-66.188 C285.553,292.505,274.771,271.302,257.709,254.287z M229.084,347.396c-2.031,10.438-6.984,20.234-15.094,28.344l-36.531,36.532 l-21.75,21.797c-1.094,1.078-2.203,2.063-3.313,2.984c-0.109,0.125-0.219,0.188-0.313,0.281c-1.141,0.953-2.313,1.875-3.516,2.75 c-3.484,2.484-7.188,4.516-11.047,6.047c-9.891,4.016-20.813,5.047-31.25,3.031c-10.391-2.047-20.188-7-28.344-15.094 c-5.391-5.453-9.375-11.578-12.063-18.188c-4.016-9.891-5.031-20.813-3.031-31.25c2.031-10.375,6.969-20.188,15.094-28.344 l35.047-35l2.141-2.156l21.125-21.125c5.438-5.438,11.594-9.375,18.188-12.094c9.891-3.984,20.813-5,31.219-3 c10.438,2.063,20.188,6.969,28.344,15.094c5.438,5.438,9.391,11.578,12.063,18.156C230.068,326.037,231.1,336.974,229.084,347.396z "/> <path class="st0" d="M509.85,94.537c-4.25-22.078-15-43.281-32.094-60.313C466.428,22.865,453.193,14.287,439.1,8.568 c-21.141-8.578-44.141-10.719-66.203-6.406c-22.047,4.219-43.313,15.016-60.344,32.063l-36.516,36.531l-21.797,21.75 c-11.328,11.359-19.938,24.594-25.641,38.688c-7.578,18.688-10.094,38.844-7.641,58.516l21.359,19.938l20.641-22.906l23.766,10.984 c-0.266-0.656-0.547-1.219-0.797-1.906c-4.016-9.875-5.047-20.828-3.031-31.219c2.031-10.406,6.984-20.219,15.094-28.328 l35.047-35.063l2.125-2.125l21.141-21.125c5.438-5.453,11.594-9.406,18.156-12.094c9.891-4.016,20.844-5.031,31.25-3 c10.406,2.047,20.188,7,28.344,15.094c5.422,5.406,9.375,11.594,12.063,18.172c4.016,9.859,5.047,20.813,3.031,31.203 c-2.047,10.438-6.969,20.234-15.094,28.344l-36.516,36.547l-21.813,21.766c-1.078,1.078-2.156,2.078-3.266,3.031 c-0.125,0.078-0.219,0.156-0.328,0.281c-1.156,0.922-2.328,1.859-3.5,2.719c-3.516,2.469-7.203,4.516-11.078,6.047 c-9.859,4.016-20.813,5.063-31.219,3.031c-2.344-0.469-4.641-1.078-6.922-1.844l-6.078,25.922l25.188,13.734l-7.453,24.875 c9.375,0.484,18.813-0.172,28.078-2c22.031-4.188,43.313-15,60.328-32.031l58.281-58.328 c11.375-11.328,19.984-24.578,25.703-38.672C512.006,139.615,514.131,116.615,509.85,94.537z"/> <polygon class="st0" points="191.115,115.474 184.35,51.38 154.412,57.583 173.459,119.13 "/> <polygon class="st0" points="129.209,161.302 73.912,128.208 60.834,155.833 121.49,177.599 "/> <polygon class="st0" points="319.49,383.818 326.271,447.928 356.178,441.756 337.131,380.193 "/> <polygon class="st0" points="381.381,338.021 436.693,371.115 449.771,343.505 389.131,321.677 "/> </g> </g>

</svg>
  );


  