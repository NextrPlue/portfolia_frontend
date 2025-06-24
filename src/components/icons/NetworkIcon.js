import React from 'react';

const NetworkIcon = ({ size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 연결선들 */}
      <line x1="20" y1="20" x2="45" y2="35" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="35" x2="80" y2="80" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="45" x2="40" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="20" x2="85" y2="45" stroke={color} strokeWidth="3" strokeLinecap="round" />
      
      {/* 노드들 (원) */}
      <circle cx="20" cy="20" r="8" fill={color} />
      <circle cx="50" cy="15" r="6" fill={color} />
      <circle cx="75" cy="20" r="8" fill={color} />
      <circle cx="15" cy="45" r="6" fill={color} />
      <circle cx="40" cy="55" r="5" fill={color} />
      <circle cx="65" cy="45" r="5" fill={color} />
      <circle cx="85" cy="45" r="8" fill={color} />
      <circle cx="40" cy="70" r="6" fill={color} />
      <circle cx="45" cy="35" r="7" fill={color} />
      <circle cx="80" cy="80" r="8" fill={color} />
    </svg>
  );
};

export default NetworkIcon;