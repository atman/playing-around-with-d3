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
    var newNumber = Math.round(Math.random() * 100);
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

var xScaleOrdinal = d3.scale.ordinal()
                        .domain(d3.range(data.length))
                        .rangeRoundBands([0,width],0.05);

var yScale = d3.scale.linear()
                     .domain([min,max]) //input
                     .rangeRound([height-20,min]) //output
                     .nice();

var xAxis = d3.svg.axis()
              .scale(xScaleOrdinal)
              .orient("bottom")
              .ticks("1");
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
        //return i * width/data.length;
        return xScaleOrdinal(i);
      })
      .attr("y",function(d){
        return height-(yScale(d))-20;
      })
      .attr("width",xScaleOrdinal.rangeBand())
      .attr("height",function(d){
        return yScale(d);
      })

/*
 * FUNCTIONS
 */
      var sortBars = function() {

              svgPlaceholder.selectAll("rect")
                 .sort(function(a, b) {
                       return d3.descending(a, b);
                 })
                 .transition()
                 .duration(1000)
                 .attr("x", function(d, i) {
                       return xScaleOrdinal(i);
                 });
      };

svgPlaceholder.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text(function(d){return d;})
   .attr("x",function(d,i){          //d is actual value, i is the position of the data in the array
     //return  i * (width/data.length) + (width / data.length - padding) / 2;
     return xScaleOrdinal(i) + (width / data.length - padding) / 2;
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

/*
 * EVENT LISTENERS
 */

 d3.select("#sort")
    .on("click",function(){
      sortBars();
    });

d3.select("p")
    .on("click",function(){
      data = [];
      for (var i = 0; i < 50; i++) {           //Loop 25 times
          var newNumber = Math.round(Math.random() * 100);
          //New random number (0-30)
          data.push(newNumber);
      }

      //Update UI
      svgPlaceholder.selectAll("rect")
          .data(data)
          .transition()
          .duration(750)
          .attr("y", function(d){
            return height - yScale(d)-20;
          })
          .attr("height", function(d){
            return yScale(d);
          });

      svgPlaceholder.selectAll("text")
         .data(data)
         .transition()
         .duration(750)
         .attr("y",function(d){
           return height-(yScale(d)) - 10;` `
         })
         .text(function(d){return d;})
         .attr("class","values");
    });
