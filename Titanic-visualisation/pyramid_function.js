// Create pyramid graph
function add_pyramid(svg, map, scale, color, left) {
    svg
        .append("g")
        .selectAll("rect")
        .data(get_sorted_key(map, true))
        .enter()
        .append("rect")
            .attr("width", d => scale(map.get(d).length)) // The length of each value in array
            .attr("height", barWidth)
            .attr("x", d => get_starting_position(scale(map.get(d).length), !left)) // Call the function to get the starting location of x
            .attr("y", (d, i ) => margin + chartHeight - (i + 1) * (barWidth + margin_bars)) // The start point of bar, (i +1) is to leave a unit of extra blanck space
            .attr("fill", color)
            .on("click", (event ,d) => {
                d3.select("#pie_svg")
                    .remove();
                d3.select("#new_bar_svg")
                    .remove();
                let colorScale = d3.scaleOrdinal().range(d3.schemeSet2); 
                let survived = d3.group(map.get(d), d => d.Survived);
                create_pie_chart(survived, colorScale, ["Dead", "Survived"]);
                let classMap = d3.group(map.get(d), d => d.Pclass);
                create_bar_chart(classMap);
            })
            .on("mouseover", (event, d) => {
                d3.select("#pyramid_svg")
                    .append("text")
                    .attr("class", "tooltip")
                    .text( `Amount : ${map.get(d).length}`)
                    .attr("x", get_starting_position(scale(map.get(d).length), !left) + margin_bars)
                    // In here d is acually equivalent to index
                    .attr("y", margin + chartHeight - (d + 1) * (barWidth + margin_bars) + margin_bars) 
            })
            .on("mouseout", (event, d) => {
                d3.selectAll(".tooltip")
                    .remove();
            });
            
                
}
function get_starting_position(value, reverse) {
    if (!reverse) {
        return starting_position =chartWidth/2 + margin - value; // If it's on the right, it use the middle of the graph - value so that every bar would be on the middle
    }
    return starting_position =chartWidth/2 + margin ;// If it's the reverse graph, it use the middle of the graph as starting point
}

// The scale for the bar 
function get_pyramid_scale(max_size) {
    return d3.scaleLinear()
            .domain([0, max_size]) // The range of value 
            .range([0, chartWidth/2]);// The start and end of where it is placed
}
function get_pyramid_axis(max_size) {
    let axis_scale = d3.scaleLinear()
                        .domain([0, max_size])
                        .range([margin + chartWidth/2, margin])
    let x_axis = d3.axisBottom(axis_scale);
    let reversed_axis_scale = d3.scaleLinear()
                        .domain([max_size, 0])
                        .range([margin + chartWidth/2, margin])
    let reversed_x_axis = d3.axisBottom(reversed_axis_scale);
    return [x_axis, reversed_x_axis];
}

function add_pyramid_axises(svg, x_axis, reversed_x_axis) {    
    svg
        .append("g")
        .attr("transform",  `translate(0,${chartHeight + margin  } )`)
        .call(x_axis);
    svg
        .append("g")
        .attr("transform",  `translate(${chartWidth/ 2}, ${chartHeight + margin})`)
        .call(reversed_x_axis);
}
function add_pyramid_label(svg, labels) { 
    svg.append("g")
        .selectAll("text")
        .attr("fill", "black")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", margin + chartWidth/2 )
        .attr("y", (d, i) => margin + chartHeight - (i + 1) * ( barWidth + margin_bars) + barWidth) //Have to add barWidth since that the acutal posiiton on graph
        .text(d => d*10 + "~" + (d+1) * 10)// d + 1 * 10 not include
        .style("font-size", barWidth);
}
function create_pyramid(leftMap, rightMap) {
    let svg = d3.select("#pyramid")
                .append("svg")
                .attr("width", svgWidth)             
                .attr("height", svgHeight)       
                .attr("id", "pyramid_svg");             
    // The max array in both leftMap and rightMap
    let max_size = Math.max(max_length(leftMap), max_length(rightMap)); 
    let scale = get_pyramid_scale(max_size);
    let key = undefined;
    if (leftMap.size > rightMap.size) {
        keys = get_sorted_key(leftMap, true);
    } else {
        keys = get_sorted_key(rightMap, true);
    }
    add_pyramid(svg, leftMap, scale, "#2f6499", true);
    add_pyramid(svg, rightMap, scale, "#fc8d62", false);
    let axises = get_pyramid_axis(max_size); 
    add_pyramid_axises(svg, axises[0], axises[1]); 
    add_pyramid_label(svg, keys);
}
         

