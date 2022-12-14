import React from 'react';
import {paths} from './utils'
const SvgComponent = ({ path, size= '32', viewBox= '0 0 28 28', fill= '#D7E0FF' }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
    <g opacity="0.5">
      <path strokeWidth="2" d={paths[path]} fill={fill} />
    </g>
  </svg>
)

export default SvgComponent