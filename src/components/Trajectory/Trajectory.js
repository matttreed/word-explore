import { useEffect, useState } from 'react';
import drawTrajectory from '../../d3/drawTrajectory';
import './Trajectory.css';
import * as d3 from "d3";

const Trajectory = (props) => {

    const {
        data,
        tooltipText,
        setTooltipText,
        onClickSVG,
        visualize,
        selectingPoint,
        clickToSelectPoint
    } = props

    const [rerender, setRerender] = useState(0);


    return (
        <div className='Main-container'>
            <div className='Sub-container'>
            <svg className='Trajectory-svg'>
                <rect className="Background" 
                    x="0" 
                    y="0" 
                    />
                {selectingPoint && <rect className="Clickable" 
                    x="0" 
                    y="0" 
                    onClick={clickToSelectPoint}
                    />}
                <path className="Trajectory"/>
                <g className='Points'/>
                <g className="Sup-points" />
                <text className="Tooltip-text">{tooltipText}</text>
            </svg>
            {selectingPoint && <div className="Border-boy"/>}
            {/* <button 
          className='Save-button'
          onClick={visualize}
        >
          Visualize
        </button> */}
        </div>
            {/* <p className="Tooltip-text">{tooltipText}</p> */}
        </div>
    )
}

export default Trajectory;