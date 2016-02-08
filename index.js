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
var width = 500;
var height = 200;
var padding = 1;

for (var i = 0; i < 25; i++) {           //Loop 25 times
    var newNumber = Math.round(Math.random() * 50);  //New random number (0-30)
    data.push(newNumber);             //Add new number to array
}

var svgPlaceholder = d3.select("body")
                          .append("svg")
                          .attr("height",height)
                          .attr("width",width)


svgPlaceholder.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x",function(d,i){          //d is actual value, i is the position of the data in the array
        return i * width/data.length;
      })
      .attr("y",function(d){
        return height-(d*4);
      })
      .attr("width",width/data.length - padding)
      .attr("height",function(d){
        return d*4;
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
     return height-(d*4) + 10;
   })
   .attr("text-anchor", "middle")
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
