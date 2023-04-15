import { forwardRef, useState, useEffect } from "react";

const MarkerDefaultLarge = forwardRef((props: any, ref: any) => {
  return (
    <svg
      ref={ref}
      className={props.className}
      width="56px"
      height="62px"
      viewBox="0 0 56 62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g transform="translate(10.000000, 6.000000)">
        <path
          d="M6,0 L30,0 C33.3137085,-6.08718376e-16 36,2.6862915 36,6 L36,24.9650732 C36,26.5856744 35.3444332,28.1373566 34.1824704,29.2670427 L20.7883136,42.2891396 C19.2358286,43.7985 16.7641714,43.7985 15.2116864,42.2891396 L1.81752964,29.2670427 C0.655566815,28.1373566 -4.07393878e-15,26.5856744 0,24.9650732 L0,6 C-4.05812251e-16,2.6862915 2.6862915,-2.79460044e-16 6,0 Z"
          id="path-1"
            style={{ fill: props.color }}
        ></path>
        </g>
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14px"
          fontFamily="Arial, sans-serif"
          fill="white"
        >
          {props.number}
        </text>
      </g>
    </svg>
  );
});

export default MarkerDefaultLarge;
//#191B5E
