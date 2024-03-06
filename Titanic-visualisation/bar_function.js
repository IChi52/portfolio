function create_bar_chart (map) {
    let keys = get_sorted_key(map, true);
    let svg = d3.select("#bar")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "new_bar_svg");
    add_bar(svg, map);
    add_bar_label(svg, keys);
    let max_size = max_length(map);
    add_bar_axis(svg, max_size);
    
}
function add_bar(svg, map) {
    let keys = get_sorted_key(map, true);
    let max_size = max_length(map);
    let scale = get_bar_scale(max_size);
    svg.selectAll("g")
        .data(keys)
        .enter()
        .append("g")
        .attr("class", "bar")
        .append("rect")
            .attr("width", barWidth)
            .attr("height", d => scale(map.get(d).length))
            .attr("x", (d, i) => margin + i * (barWidth + margin_bars))
            .attr("y", d => chartHeight + margin - scale(map.get(d).length))
            .attr("fill", "#2f6499")
            .on('click', (event, d) => {
                d3.select('#pie_svg')
                    .remove()
                let survival_map = d3.group(map.get(d), d => d.Survived);
                var classSelectedValue = map.get(`${d}`);
                 console.log("classSelectedValue is ", classSelectedValue)
                 const color = d3.scaleOrdinal()
                 .range(d3.schemeSet2);  
                 let pieLabel = ["Dead", "Survived"];

                 create_pie_chart( survival_map, color, pieLabel);
                


                 // update the value of each gender when clicking on class
                 let sex_map = d3.group(classSelectedValue, d => d.Sex);
                 let classified_male_map = d3.group(sex_map.get("male"), d => d.Age);
                 let classified_female_map = d3.group(sex_map.get("female"), d => d.Age);

                 d3.selectAll("#pyramid_svg")
                 .remove();
                 create_pyramid(classified_male_map, classified_female_map);
                })
            .on("mouseover", (event, d) => {
                d3.select("#new_bar_svg")
                    .append("text")
                    .attr("class", "tooltip")
                    .text( `Amount : ${map.get(d).length}`)
                    // In here d is acually equivalent to index
                    .attr("x", margin + d * (barWidth + margin_bars))
                    .attr("y", chartHeight + margin - scale(map.get(d).length))
            })
            .on("mouseout", (event, d) => {
                d3.selectAll(".tooltip")
                    .remove();

             });
}

function add_bar_label(svg, label) {
    svg.append("g")
        .selectAll("text")
        .attr("fill", "black")
        .data(label)
        .enter()
        .append("text")
        .attr("x", (d, i) => margin + i * (barWidth + margin_bars)) 
        .attr("y", margin + chartHeight + margin_bars)
        .text(d => d)
        .style("font-size", barWidth);
}
function add_bar_axis(svg, max_size) {
    let y_axis = get_bar_axis(max_size);
    svg.append("g")
        .attr("transform", `translate(${margin - margin_bars}, 0)`)
        .call(y_axis);
}
function get_bar_axis(max_size) {
    let axisScale = d3.scaleLinear()
                    .domain([0, max_size])
                    .range([chartHeight + margin, margin]);
    return d3.axisLeft(axisScale);
}
// The scale for the bar 
function get_bar_scale(max_size) {
    return d3.scaleLinear()
            .domain([0, max_size]) // The range of value 
            .range([0, chartWidth]);// The start and end of where it is placed
}
