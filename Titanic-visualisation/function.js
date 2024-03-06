// Make the Age column of data divided by the unit(user specified)
// The value would become int(age/unit)
// New value would contain the range from value * unit to (value  + 1) * unit exclude (value + 1) * unit 
function age_to_unit(data, unit) {
    for (let index = 0; index < data.length; index ++) {
        data[index].Age = Math.round(data[index].Age/unit);
    }
}
// Would return the longest length of arrays in map
function max_length(map) {
    let length = 0;
    for (value of map.values()) {
        length = Math.max(length, value.length);
    }
    return length;
}    
// Would take map as input and sort the key of it, because can't sort keys() object directly
function get_sorted_key(map, ascending) {
    let keys = Array.from(map.keys());
    keys.sort();
    if (!ascending) {
        keys.reverse();
    }
    return keys;
}
// Would create a new map with key and its length
function key_to_length(map) {
    let keys = get_sorted_key(map, true);
    let keyToLength = {};
    for (var key in keys) {
        keyToLength[key] = map.get(key).length;
    }
    return keyToLength;
} 
// Would get the total length of a map
function get_pie_data_total(data) {
    let total = 0;
    for (value of data.values()) {
        console.log(value);
        console.log("length: " + value);
        total += value.value;
    }
    return total;
}
// Initialize 3 graph by given data
function initialize(data) {
    let class_map = d3.group(data, d => d.Pclass);
    // Plotting bar chart using given grouped data
    // Defined in bar_function.js
    create_bar_chart(class_map);
    let sex_map = d3.group(data, d => d.Sex);
    let female_map = d3.group(sex_map.get("female"), d => d.Age);
    let male_map = d3.group(sex_map.get("male"), d => d.Age);
    // Plotting pyramid grpah using given grouped data
    // Defined in pyramid_function.js
    create_pyramid(male_map, female_map);

    let survival_map = d3.group(data, d => d.Survived);
    const color = d3.scaleOrdinal()
                        .range(d3.schemeSet2);
    let pieLabel = ["Dead", "Survived"];
    // Plotting pie chart using given grouped data
    // Defined in pie_function.js
    create_pie_chart(survival_map, color, pieLabel);
}
// Remove all the graph and reinitialize by given data
function reset_to_UI(data) {
    d3.select("#new_bar_svg")
        .remove()
    d3.select("#pyramid_svg")
        .remove()
    d3.select("#pie_svg")
        .remove()
    initialize(data);
}
    
    
    
