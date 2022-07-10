import React from "react";
import "../Styles/BarGroup.css"

const BarGroup = (props) => {
    let barColour = 'rgb(92, 92, 92)';

    let widthScale = d => d/props.highest
  
    let width = widthScale(props.d.value) * 100
    
    return (
      <div className="bar-chart-bar-group">
        <div className='bar-graph-label'>{props.d.name}</div>
        <div className="bar-graph-bar-div">
          <div  style={{backgroundColor: barColour, width: `${width}%`}} className='bar-graph-bar'>
            <div className="value-label">{props.d.value}</div>
          </div>
        </div>
      </div>
    )
  }

  export default BarGroup;