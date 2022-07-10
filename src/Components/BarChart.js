import React, { useState } from "react";
import BarGroup from "./BarGroup";

const BarChart = () => {
    const [data, setData] = useState([
        { name: '0:30', value: 20 },
        { name: '1:00', value: 40 },
        { name: '1:30', value: 35 },
        { name: '2:00', value: 50 },
        { name: '2:30', value: 55 },
        { name: '3:00', value: 40 }
      ])

      let barHeight = 20;

      let barGroups = data.map((d, i) => <g key={i} transform={`translate(0, ${i * barHeight})`}>
                                            <BarGroup d={d} barHeight={barHeight} />
                                        </g>)
      
  
      return (
        <svg width="400" height="300" >
            <g className="container">
                {barGroups}
            </g>
        </svg>
      );
  }

  export default BarChart;