import React, { useState } from "react";
import BarGroup from "./BarGroup";
import "../Styles/BarChart.css"

const BarChart = ({stats, gameOver, minutes, seconds, resultsBar}) => {
    const [data, setData] = useState([
      { name: '0:10', value: stats.times.tenSecondsOrLess },
      { name: '0:20', value: stats.times.twentySecondsOrLess },
      { name: '0:30', value: stats.times.thirtySecondsOrLess },
      { name: '1:00', value: stats.times.oneMinuteOrLess },
      { name: '1:30', value: stats.times.oneMinuteThirtySecondsOrLess },
      { name: '2:00', value: stats.times.twoMinutesOrLess }
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