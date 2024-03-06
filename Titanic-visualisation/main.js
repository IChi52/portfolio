
d3.csv(dataPath)
    .then((data) => {
        console.log(data.Pclass)
        console.log(data);

        let myData = data;
        let class_map = d3.group(data, d=> d.Pclass);
        let class_key = Array.from(class_map.keys());

    // Change the age column to int(math/10) 
    age_to_unit(data, 10);
    
    // Initialize data to the graph
    initialize(data);
    // Create a button that whenever it's click, it use data 
    // given to solve the problem
    d3.select("body")
        .append("button")
        .text("Reset Data")
        .on("click", d => reset_to_UI(data));

})
