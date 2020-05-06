import React from 'react';

import { ISVG } from 'types/types';

const SVG: React.FC<ISVG> = ({
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 448 512',
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    ></path>
  </svg>
);

export default SVG;
// import React from 'react';

// const Plus: React.FC<{ color: string }> = ({ color }) => (
//   <svg
//     aria-hidden="true"
//     focusable="false"
//     data-prefix="fas"
//     data-icon="plus"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 448 512"
//   >
//     <path
//       fill={color}
//       d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
//     ></path>
//   </svg>
// );

// export default Plus;
