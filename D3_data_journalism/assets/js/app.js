//DEFINE SVG ARE FOR CHART
var svgWidth = 950;
var svgHeight = 500;

//DEFINE THE CHART'S MARGINS AS AN OBJECT
var chartMargin = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50
};

//DEFINE DIMENSIONS OF THE CHART AREA
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//APPEND SVG AREA AND SET DIMENSIONS
//THE MARGINS SET IN THE "CHARTMARGIN" OBJECT
var svg = d3
    .select("#scatter")
.append("svg")
    .attr("width", chartWidth + chartMargin.left + chartMargin.right)
    .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)

.append("g")
    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

//LOAD DATA FROM CSV
d3.csv("assets/data/data.csv", function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    return data;
    }).then(function(data) {
        console.log(data);
    

    //console.log(data.poverty);
    //console.log(data.healthcare);

//SET SCALE
var x = d3.scaleLinear()
    .domain([0, 24])
    //.domain([d3.min(data.poverty)-2, d3.max(data.poverty)+2])
    .range([0, chartWidth]);
svg.append ("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .domain([0, 28])
    //.domain([d3.min(data.healthcare)-2, d3.max(data.healthcare)+2])
    .range([chartHeight, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// X LABEL
svg.append("text")
    .attr('transform', 'translate(' + (chartWidth/2) + ' ,' + (chartHeight + chartMargin.top + 30) + ')')
    .attr('text-anchor', 'middle')
    .attr('data-axis-name', 'poverty')
    .text('In Poverty (%)');

//Y LABEL
svg.append("text")
    .attr('transform', 'rotate(-90)')
    .attr('y', 20 - chartMargin.left)
    .attr('x', 0 - (chartHeight/2))
    .attr('text-anchor', 'middle')
    .text('Lacks Healthcare (%)');

    
//PLUG IN DATAPOINTS
svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.healthcare); } )
        .attr("r", 9)
        .classed("stateCircle", true)

//ADD STATE NAMES TO CIRCLES
svg.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
        .attr("dx", function (d) { return x(d.poverty); } )
        .attr("dy", function (d) { return (y(d.healthcare) + 4)})
        .text(function (d) { return d.abbr} )
        .classed("stateText", true)


});