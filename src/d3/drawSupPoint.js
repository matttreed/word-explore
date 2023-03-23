import * as d3 from "d3";

const drawSupPoints = (supPoints, toolTipCallback) => {

    const svg = d3.select(".Trajectory-svg");
    const supPointsGroup = svg.select(".Sup-points")
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

    supPointsGroup.selectAll("rect")
        .data(supPoints.map((d,i) => {
            return {...d, index: i}
        }))
        .join("rect")
        .attr("x", d => xScale(d.vector[0]) - 5)
        .attr("y", d => yScale(d.vector[1]) - 5)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d,i) => d3.schemeSet1[i % 9])
        .attr("opacity", 1)
        .on("mouseover", function (event, d) {
            toolTipCallback(d.word);
            svg.select(".Tooltip-text")
                .attr("transform", `translate(${xScale(d.vector[0]) + 10}, ${yScale(d.vector[1]) - 10})`) 
                .style("display", "block")
                .style("fill", d3.schemeSet1[d.index % 9])
                .text(d.word);
            d3.select(this)
                .attr("stroke", "#333333")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function (event, d) {
            svg.select(".Tooltip-text").style("display", "none");
            d3.select(this).attr("stroke", "none");
        });
}

export default drawSupPoints;