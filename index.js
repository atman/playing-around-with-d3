/*var jsonCircles = [
   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
   { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
   { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];

var svgContainer = d3.select("body")
                        .append("svg")
                            .attr("height",700)
                            .attr("width",700);

var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle");

var fillstyle = function(d){
    var returnColor;
    if(d===30)
        returnColor = "green";
    else if(d===70)
        returnColor = "red";
    else if(d===110)
        returnColor = "black";

    return returnColor;
}

var circleAttributes = circles
                            .attr("cx",function(d){return d.x_axis})
                            .attr("cy",function(d){return d.y_axis})
                            .attr("r",function (d) {return d.radius;})
                            .style("fill",function(d){return d.color;});*/

var data = [];
var width = 1000;
var height = 300;
var padding = 3;
var max = 0;
var min = 0;

for (var i = 0; i < 50; i++) {           //Loop 25 times
    var newNumber = Math.round(Math.random() * 50);
    //New random number (0-30)
    data.push(newNumber);
}

min = d3.min(data);
max = d3.max(data);
/*
 * AXES
 * 1. Create a scale for each axis
 * 2. Create new axes
 * 3. Append after main data is added
 */

var xScale = d3.scale.linear()
                      .domain([0,data.length])
                      .range([0,width]);
var yScale = d3.scale.linear()
                     .domain([min,max]) //input
                     .rangeRound([min, height-20]) //output
                     .nice();

var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .ticks("5");
var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(5);

/*
 * SVG Objects
 * 1. Create the main SVG placeholder and append it to <body>
 * 2. Create the type of SVG to be used and append it with data
 * 3. Append data values in text form to the SVG
 */
var svgPlaceholder = d3.select("body")
                          .append("svg")
                          .attr("height",height)
                          .attr("width",width)
                          .attr("class","chart");

svgPlaceholder.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x",function(d,i){          //d is actual value, i is the position of the data in the array
        return i * width/data.length;
      })
      .attr("y",function(d){
        return height-(yScale(d))-20;
      })
      .attr("width",width/data.length - padding)
      .attr("height",function(d){
        return yScale(d);
      })

svgPlaceholder.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text(function(d){return d;})
   .attr("x",function(d,i){          //d is actual value, i is the position of the data in the array
     return  i * (width/data.length) + (width / data.length - padding) / 2;;
   })
   .attr("y",function(d){
     return height-(yScale(d)) - 10;
   })
   .attr("class","values");

/* Append the Axes */
//Create X Axis
svgPlaceholder.append("g")
                .attr("class","axis")
                .attr("transform", "translate(0," + (height - 20) + ")")
                .call(xAxis);

//Create Y axis
svgPlaceholder.append("g")
                .attr("class", "axis")
                .call(yAxis);
