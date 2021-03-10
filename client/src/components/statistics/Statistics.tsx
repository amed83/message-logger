import React, { FC, memo } from "react";

interface StatsProps {
  warning: number;
  info: number;
  error: number;
}

const divStyle = {
  width: "200px",
  height: "300px",
  border: "solid black 1px",
  position: "fixed",
} as React.CSSProperties;

export const Statistics: FC<StatsProps> = memo(({ warning, info, error }) => {
  return (
    <div style={divStyle}>
      <p>Warnings: {warning}</p>
      <p>Info :{info}</p>
      <p>Error :{error}</p>
    </div>
  );
});
