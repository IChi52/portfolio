function create_pie_chart(map, colorScale, label) {
    let keyToLength = key_to_length(map);
        
        
    
    // The radius of pie chart is half the min(width/2, height/2) 
    var radius = Math.min(chartHeight, chartWidth)/2;
    
    var svg = d3.select("#pie")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "pie_svg")
        .append("g")
        .attr("transform", `translate( ${svgWidth/2}, ${svgHeight/2}) `);
    const pie = d3.pie().value(d => d[1]);
    const pie_data = pie(Object.entries(keyToLength));
    const arcGenerator = d3.arc()
                            .innerRadius(0)
                            .outerRadius(radius);
    add_slices(svg, pie_data, colorScale, arcGenerator, map);
    add_pie_label(svg, pie_data,label, arcGenerator);
    add_legend(svg, label, colorScale);
    
}
// Add slices to svg
function add_slices(svg, data, color, arcGenerator, map) {
    svg.selectAll("#pieSlices")
        .data(data)
        .join("path")
        .attr('d', arcGenerator)
        .attr("fill", (d,i) => color(i))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on('click', (event, d) => {
            d3.select("#new_bar_svg")
                .remove()
            let filtered_map = map.get(d.data[0]);
            let survival_class_map = d3.group(filtered_map, d => d.Pclass);
            create_bar_chart(survival_class_map);
            // update pyramid (click Survived, update the pyramid to show number and age distribution)
            d3.select("#pyramid_svg")
                .remove()
            let sex_map = d3.group(filtered_map, d => d.Sex);
            let survival_male_map = d3.group(sex_map.get("male"), d => d.Age);
            let survival_female_map = d3.group(sex_map.get("female"), d => d.Age);
            create_pyramid(survival_male_map, survival_female_map)
        })
        .on("mouseover", (event, d) => {
            d3.select("#pie_svg")
                .append("text")
                .attr("class", "tooltip")
                .text( `Amount : ${d.data[1]}`)
                .attr("x", margin + chartWidth/2)
                // margin - 10 
                .attr("y", margin - 10 )
                //.attr("transform", `translate(${arcGenerator.centroid(d) + 10})`) 
                .style("text-anchor", "middle")
                .style("font-size", 17);
        })
        .on("mouseout", (event, d) => {
            d3.selectAll(".tooltip")
                .remove();
        });
}
function add_pie_label(svg, data, label, arcGenerator) {
    let totalAmount = get_pie_data_total(data);
    svg.selectAll("#pieSlices")
        .data(data)
        .join("text")
        .text( d => `${label[d.data[0]]} : ${(d.data[1]/totalAmount*100).toFixed(2)}%`)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) 
        .style("text-anchor", "middle")
        .style("font-size", 17);
}
function add_legend(svg, label, colorScale) {
    var legends = svg.append("g")
        // below should make it change based on svgHeight and svgWidth
        .attr("transform", "translate(160,80)")
        .selectAll(".legends")
        .data(label)
    var legend = legends
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(0, ${(i + 1) * 60})`);
    legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", (d,i) => colorScale(i))
    legend.append("text")
        .text(d => d)
        .attr("transform", "translate(0, -5)")
} 
