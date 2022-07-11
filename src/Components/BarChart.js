import React, { useState } from "react";
import BarGroup from "./BarGroup";
import "../Styles/BarChart.css"

const BarChart = ({gameOver, minutes, seconds, resultsBar}) => {
    const [data, setData] = useState([
      { name: '0:30', value: 1 },
      { name: '1:00', value: 12 },
      { name: '1:30', value: 29 },
      { name: '2:00', value: 50 },
      { name: '2:30', value: 51 },
      { name: '3:00', value: 42 }
    ])
    

    let highest = 0;
    data.map(d => d.value > highest ? highest = d.value : highest)

    let barGroups = data.map((d, i) => <BarGroup key={i} data={d} highest={highest} resultsBar={resultsBar} />)
    

    return (
      <div id="bar-chart-container">
          {barGroups}
      </div>
    );
}

export default BarChart;