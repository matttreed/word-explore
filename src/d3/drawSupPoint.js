import * as d3 from "d3";

const drawSupPoints = (className, supPoints) => {

    console.log(supPoints)

    return;

    const svg = d3.select("." + className);
    const supPointsGroup = svg.select("Sup-points")
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

    supPointsGroup.selectAll("circle")
        .data(supPoints)
        .join("circle")
        .attr("cx", d => xScale(d.vec[0]))
        .attr("cy", d => yScale(d.vec[1]))
        .attr("r", 5)
        .attr("fill", "#ff0000")
        .attr("opacity", 1)
        .on("mouseover", function (event, d) {
            svg.select(".Tooltip-text")
                .attr("transform", `translate(${xScale(d.x) + 5}, ${yScale(d.y) - 5})`) 
                .style("display", "block");
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