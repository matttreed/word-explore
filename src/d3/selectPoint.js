import * as d3 from "d3";

const selectPoint = (vec, VectorHandler) => {

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
    
    // const clickable = svg.select(".Clickable")

    const newVec = [xScale.invert(vec[0]), yScale.invert(vec[1])]
    return VectorHandler.getWordForVec(newVec);

    // clickable.attr("display", "block")

    // console.log(clickable)

    // clickable.on("click", function (event) {
    //     console.log(event)
    //     d3.select(this)
    //         .attr("display", "none")
    // })
    return;
    
    // const pathLength = path.node().getTotalLength();
    // path.attr("stroke-dashoffset", pathLength)
    //     .attr("stroke-dasharray", pathLength);

    // const transitionPath = d3
    //     .transition()
    //     .ease(d3.easeSin)
    //     .duration(pathLength * 1);

    // path
    //     .attr("stroke-dashoffset", pathLength)
    //     .attr("stroke-dasharray", pathLength)
    //     .transition(transitionPath)
    //     .attr("stroke-dashoffset", 0);

    // const hoverColor = "#A084DC"
    // const normalColor = "#645CBB"


    // const rectangle = svg.select(".clickable")
    // rectangle.on("click", (e, d) => 
    // })
}

export default selectPoint;