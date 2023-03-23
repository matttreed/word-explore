import * as d3 from "d3";

function euclideanDistance(vec1, vec2) {
    return ((vec1[0] - vec2[0]) ** 2 + (vec1[1] - vec2[1]) ** 2) ** 0.5
}

function cosineDistance(vec1, vec2) {
    const dot = (vec1[0] * vec2[0]) + (vec1[1] * vec2[1]);
    const vec1Size = euclideanDistance([0,0], vec1);
    const vec2Size = euclideanDistance([0,0], vec2);
    return (dot / (vec1Size * vec2Size));
}

const drawTrend = (data, trendWords, toolTipCallback, useCosine) => {

    const distance = useCosine ? cosineDistance : euclideanDistance;

    const svg = d3.select(".Trends-svg");
    let width = parseInt(svg.style("width"), 10)
    let height = parseInt(svg.style("height"), 10)

    const yScale = d3
        .scaleLinear()
        .domain(useCosine ? [1, -1] : [0, 50])
        .range([0, height])

    const xScale = d3
        .scaleLinear()
        .domain([0,data.length - 1])
        .range([0, width])
    
    const lineGenerator = d3
        .line()
        .x(function (dataPoint, i) { 
            return xScale(i)
        })
        .y(function (dataPoint) {
            return yScale(dataPoint)
        })
        .curve(d3.curveMonotoneX);
    
    const paths = svg.select(".Trends").selectAll("path")

    const hoverColor = "#A084DC"
    const normalColor = "#645CBB"

    paths.data(trendWords)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d,i) => d3.schemePastel1[i % 9])
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", d => {
            return lineGenerator(data.map(point => {
                return distance([point.x, point.y], d.vector)
            }))
        })
        .each(function(d, i) {
            const path = d3.select(this)
            const pathLength = path.node().getTotalLength();
            path.attr("stroke-dashoffset", pathLength)
                .attr("stroke-dasharray", pathLength);
        
            const transitionPath = d3
                .transition()
                .duration(0)
                .delay(i * 300)
                .transition()
                .ease(d3.easeSin)
                .duration(pathLength * 1);
        
            path
                .attr("stroke-dashoffset", pathLength)
                .attr("stroke-dasharray", pathLength)
                .transition(transitionPath)
                .attr("stroke-dashoffset", 0);
        })

    const rects = svg
        .select(".Trends-Rects")
        .selectAll("rect")
        .data(data.map((d, i) => {
            return {...d, index: i}
        }))
        .join("rect")
        .attr("x", (d, i) => xScale(i-0.5))
        .attr("y", d => 0)
        .attr("width", width / ((data.length - 1) + .001))
        .attr("height", height)
        .attr("fill", hoverColor)
        .attr("id", (d,i) => "rect" + String(i))
        .on("mouseover", function (event, d) {
            toolTipCallback(d.word)
            svg.select(".Trends-Tooltip-text")
                .text(d.word)
            d3.select(this)
                .transition()
                .duration(10)
                .attr("fill", hoverColor);
            d3.select("#point" + String(d.index))
                .attr("stroke", "#333333")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
            .transition()
            .duration(300)
            .attr("fill", normalColor);
            d3.select("#point" + String(d.index))
            .attr("stroke", "none");
        });

    rects.transition()
        .duration(0)
        .delay((d, i) => (i) * 100)
        .transition()
        .duration(1000)
        .attr("fill", normalColor)

    // svg.select(".clickable").on("click", (e, d) => {
    //     const vec = [xScale.invert(e.offsetX), yScale.invert(e.offsetY)]
    //     clickCallback(vec);
    //     console.log(vec)
    // })
}

export default drawTrend;