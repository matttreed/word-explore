import * as d3 from "d3";

const drawTrajectory = (className, data) => {

    const svg = d3.select("." + className);
    let width = parseInt(svg.style("width"), 10)
    let height = parseInt(svg.style("height"), 10)

    console.log(width)

    data = {
        values: data
    }

    const yScale = d3
        .scaleLinear()
        .domain([-30,30])
        .range([height, 0])

    const xScale = d3
        .scaleLinear()
        .domain([-30,30])
        .range([0, width])
    
    const trajectory = d3
        .line()
        .x(function (dataPoint) {
            console.log(dataPoint, dataPoint[0], xScale(dataPoint[0]))
            return xScale(dataPoint[0])
        })
        .y(function (dataPoint) {return yScale(dataPoint[1])})
        .curve(d3.curveNatural);
    
    const path = svg.select("path")

    path.datum(data)
        .attr("fill", "none")
        .attr("stroke", "white")
        // .attr("stroke-linejoin", "round")
        // .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", d => trajectory(d.values));
    
    const pathLength = path.node().getTotalLength();
    console.log(pathLength)
    path.attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength);

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(pathLength * 10);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);


}

export default drawTrajectory;