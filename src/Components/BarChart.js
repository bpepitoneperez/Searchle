import React, { useState } from "react";
import BarGroup from "./BarGroup";
import "../Styles/BarChart.css"

const BarChart = ({stats, gameOver, minutes, seconds, resultsBar}) => {
    const [data, setData] = useState([
      { name: '0:30', value: stats.times.thirtyOrLess },
      { name: '1:00', value: stats.times.oneOrLess },
      { name: '1:30', value: stats.times.oneThirtyOrLess },
      { name: '2:00', value: stats.times.twoOrLess },
      { name: '2:30', value: stats.times.twoThirtyOrLess },
      { name: '3:00', value: stats.times.threeOrLess }
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