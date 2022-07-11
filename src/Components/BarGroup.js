import React from "react";
import "../Styles/BarGroup.css"

const BarGroup = ({data, highest, resultsBar}) => {
    let barColour = 'rgb(60,60,60)';

    if (data.name === resultsBar)
      barColour = 'rgb(250,166,34)';
      

    let widthScale = d => d/highest
  
    let width = widthScale(data.value) * 100
    
    return (
      <div className="bar-chart-bar-group">
        <div className='bar-graph-label'>{data.name}</div>
        <div className="bar-graph-bar-div">
          <div  style={{backgroundColor: barColour, width: `${width}%`}} className='bar-graph-bar'>
            <div className="value-label">{data.value}</div>
          </div>
        </div>
      </div>
    )
  }

  export default BarGroup;