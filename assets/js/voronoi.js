var width = d3.select("#voronoi-graph").node().getBoundingClientRect().width;
var height = d3.select("#voronoi-graph").node().getBoundingClientRect().height;

var svg = d3.select("#voronoi-graph").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("touchmove mousemove", moved),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var sites = d3.range(200)
    .map(function(d) {
        return [Math.random() * width, Math.random() * height];
    });

var voronoi = d3.voronoi();
voronoi.extent([
    [-1, -1],
    [width + 1, height + 1]
]);

var polygon = svg.append("g")
    .attr("class", "polygons")
    .selectAll("path")
    .data(voronoi.polygons(sites))
    .enter().append("path")
    .call(redrawPolygon);

function windowResize() {
    var width = d3.select("#voronoi-graph").node().getBoundingClientRect().width;
    var height = d3.select("#voronoi-graph").node().getBoundingClientRect().height;

    console.log("Redrawn: " + width + " " + height);
    svg.attr("width", width);
    // .attr("height", height);
    voronoi.extent([
        [-1, -1],
        [width + 1, height + 1]
    ]);
    sites = d3.range(200)
        .map(function(d) {
            return [Math.random() * width, Math.random() * height];
        });

    svg.select("g").remove();
    polygon = svg.append("g")
        .attr("class", "polygons")
        .selectAll("path")
        .data(voronoi.polygons(sites))
        .enter().append("path")
        .call(redrawPolygon);
}

function redraw() {
    var diagram = voronoi(sites);
    polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
}

function moved() {
    sites[0] = d3.mouse(this);
    redraw();
}

function redrawPolygon(polygon) {
    polygon
        .attr("d", function(d) {
            return d ? "M" + d.join("L") + "Z" : null;
        });
}

function redrawLink(link) {
    link
        .attr("x1", function(d) {
            return d.source[0];
        })
        .attr("y1", function(d) {
            return d.source[1];
        })
        .attr("x2", function(d) {
            return d.target[0];
        })
        .attr("y2", function(d) {
            return d.target[1];
        });
}


d3.select(window).on('resize', windowResize);
