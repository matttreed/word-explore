import { useEffect, useState } from 'react';
import "./Trends.css";
import * as d3 from "d3";

const Trends = (props) => {

    const {
        data,
        trendTooltipText,
        setTrendTooltipText,
        onClickSVG
    } = props

    return (
        <div className='Trends-Main-container'>
            <svg className='Trends-svg'>
                <rect className="Trends-Clickable" 
                    x="0" 
                    y="0" 
                >
                    </rect>
                <g className='Trends-Rects'/>
                <g className="Trends" />
                <text className="Trends-Tooltip-text" x={20} y={70}>{trendTooltipText}</text>
                {/* <path className="Trends"/> */}
            </svg>
            {/* <p className="Tooltip-text">{tooltipText}</p> */}
        </div>
    )
}

export default Trends;