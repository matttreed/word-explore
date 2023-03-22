import { useEffect, useState } from 'react';
import drawTrajectory from '../../d3/drawTrajectory';
import './Trajectory.css';
import * as d3 from "d3";

const Trajectory = (props) => {

    const {
        data,
        tooltipText,
        setTooltipText,
        onClickSVG
    } = props

    const [rerender, setRerender] = useState(0);

    useEffect(() => {
        // setOnClick();
    })

    const setOnClick = () => {

        const svg = d3.select(".Trajectory-svg");
        let width = parseInt(svg.style("width"), 10)
        let height = parseInt(svg.style("height"), 10)

        const yScale = d3
            .scaleLinear()
            .domain([-30,30])
            .range([height, 0])

        const xScale = d3
            .scaleLinear()
            .domain([-30,30])
            .range([0, width])

        const rectangle = svg.select(".clickable")

        console.log(rectangle)
        
        rectangle.on("click", (e, d) => {
            const vec = [xScale.invert(e.offsetX), yScale.invert(e.offsetY)]
            onClickSVG(vec);
            console.log(vec)
        })
    }

    return (
        <div className='Main-container'>
            <svg className='Trajectory-svg'>
                <rect className="Clickable" 
                    x="0" 
                    y="0" 
                />
                <path className="Trajectory"/>
                <g className='Points'/>
                <g className="Sup-points" />
                <text className="Tooltip-text">{tooltipText}</text>
            </svg>
            {/* <p className="Tooltip-text">{tooltipText}</p> */}
        </div>
    )
}

export default Trajectory;