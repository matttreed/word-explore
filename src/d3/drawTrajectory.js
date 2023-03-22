import * as d3 from "d3";

const drawSVG = (className, data, toolTipCallback) => {

    const svg = d3.select("." + className);
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
    
    const trajectory = d3
        .line()
        .x(function (dataPoint) { return xScale(dataPoint.x)})
        .y(function (dataPoint) {return yScale(dataPoint.y)})
        .curve(d3.curveNatural);
    
    const path = svg.select("path")

    path.datum(data)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", trajectory);
    
    const pathLength = path.node().getTotalLength();
    path.attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength);

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(pathLength * 1);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);

    const points = svg
        .select(".Points")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 5)
        .attr("fill", "#000000")
        .attr("opacity", 0)
        .on("mouseover", function (event, d) {
            toolTipCallback(d.word)
            svg.select(".Tooltip-text")
                .attr("transform", `translate(${xScale(d.x) + 10}, ${yScale(d.y) - 10})`) 
                .style("display", "block")
                .text(d.word)
            d3.select(this)
                .attr("stroke", "#333333")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function (event, d) {
            svg.select(".Tooltip-text").style("display", "none");
            d3.select(this).attr("stroke", "none");
        });

    points.transition()
        .duration(0)
        .delay((d, i) => (i) * 100)
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .attr("fill", "#645CBB")

    // svg.select(".clickable").on("click", (e, d) => {
    //     const vec = [xScale.invert(e.offsetX), yScale.invert(e.offsetY)]
    //     clickCallback(vec);
    //     console.log(vec)
    // })
}

export default drawSVG;