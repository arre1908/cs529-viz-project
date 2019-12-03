import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export class Heatmap {
  init(layers, svgId) {
    this.svg0 = d3.select('#heatmap-0');
    this.svg1 = d3.select('#heatmap-1');
    this.svg2 = d3.select('#heatmap-2');
    this.svg3 = d3.select('#heatmap-3');

    this.colorScaleP = d3
      .scaleSequential(d3.interpolateWarm)
      .domain([1.8, 1.6]);
    this.colorScaleG = d3
      .scaleSequential(d3.interpolateWarm)
      .domain([0.3, 0.0]);

    this.margin = 3;
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();

    this.dimensionSize = Math.sqrt(layers[0].length);

    this.update(layers, 0);
  }

  update(layers, timestamp) {
    let content0 = [];
    let content1 = [];
    let content2 = [];
    let content3 = [];

    for (let row = 0; row < 100; row++) {
      content0.push(layers[0][row][timestamp]);
      content1.push(layers[1][row][timestamp]);
      content2.push(layers[2][row][timestamp]);
      content3.push(layers[3][row][timestamp]);
    }

    this.xScale.range([0, this.svg0.attr('width')]).domain([0, 10]);

    this.yScale
      .range([0 + this.margin, this.svg0.attr('height') - this.margin])
      .domain([0, 10]);

    let x = this.svg0.attr('width') / this.dimensionSize + 1;
    let y = this.svg0.attr('height') / this.dimensionSize + 1;

    // Clear SVG
    this.svg0.html(null);
    this.svg1.html(null);
    this.svg2.html(null);
    this.svg3.html(null);

    // tool tip
    let tip0 = d3Tip()
      .attr('class', 'd3-tip')
      .style("visibility", "visible")
      .style("opacity", 0)
      .offset([-20, 0])
      .html(function (d, i) {
        let val = layers[0][0][i];
        return "Voltage: " + d3.format(".4f")(val);
      });

    tip0(this.svg0.append("g"));

    this.svg0
      .selectAll('rect')
      .data(content0)
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i % this.dimensionSize))
      .attr('y', (d, i) => this.yScale(Math.floor(i / this.dimensionSize)))
      .attr('width', x)
      .attr('height', y)
      .attr('fill', d => this.colorScaleG(d))
      .on('mouseover', tip0.show)
      .on('mouseout', tip0.hide)
      .on('click', function (d, i) {
        console.log("Layer 0 " + "Node " + i);
      })


    this.svg0.append("text")
      .attr("transform",
        "translate(" + (this.svg0.attr('width') / 2) + " ," +
        (20) + ")")
      .style("text-anchor", "middle")
      .text("Layer0 (G)")
      .attr('fill', "black")
      .attr('font-size', '20px')

    let tip1 = d3Tip()
      .attr('class', 'd3-tip')
      .style("visibility", "visible")
      .offset([-20, 0])
      .html(function (d, i) {
        let val = layers[1][0][i];
        return "Voltage: " + d3.format(".4f")(val);
      });

    tip1(this.svg1.append("g"));


    this.svg1
      .selectAll('rect')
      .data(content1)
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i % this.dimensionSize))
      .attr('y', (d, i) => this.yScale(Math.floor(i / this.dimensionSize)))
      .attr('width', x)
      .attr('height', y)
      .attr('fill', d => this.colorScaleP(d))
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide)
      .on('click', function (d, i) {
        console.log("Layer 1 " + "Node " + i);
      })

    this.svg1.append("text")
      .attr("transform",
        "translate(" + (this.svg1.attr('width') / 2) + " ," +
        (20) + ")")
      .style("text-anchor", "middle")
      .text("Layer1 (P)")
      .attr('fill', "black")
      .attr('font-size', '20px')

    let tip2 = d3Tip()
      .attr('class', 'd3-tip')
      .style("visibility", "visible")
      .offset([-20, 0])
      .html(function (d, i) {
        let val = layers[2][i][i];
        return "Voltage: " + d3.format(".4f")(val);
      });

    tip2(this.svg2.append("g"));

    this.svg2
      .selectAll('rect')
      .data(content2)
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i % this.dimensionSize))
      .attr('y', (d, i) => this.yScale(Math.floor(i / this.dimensionSize)))
      .attr('width', x)
      .attr('height', y)
      .attr('fill', d => this.colorScaleG(d))
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)
      .on('click', function (d, i) {
        console.log("Layer 2 " + "Node " + i);
      })


    this.svg2.append("text")
      .attr("transform",
        "translate(" + (this.svg2.attr('width') / 2) + " ," +
        (20) + ")")
      .style("text-anchor", "middle")
      .text("Layer2 (G)")
      .attr('fill', "black")
      .attr('font-size', '20px')

    let tip3 = d3Tip()
      .attr('class', 'd3-tip')
      .style("visibility", "visible")
      .offset([-20, 0])
      .html(function (d, i) {
        let val = layers[3][0][i];
        return "Voltage: " + d3.format(".4f")(val);
      });

    tip3(this.svg3.append("g"));

    this.svg3
      .selectAll('rect')
      .data(content3)
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.xScale(i % this.dimensionSize))
      .attr('y', (d, i) => this.yScale(Math.floor(i / this.dimensionSize)))
      .attr('width', x)
      .attr('height', y)
      .attr('fill', d => this.colorScaleP(d))
      .on('mouseover', tip3.show)
      .on('mouseout', tip3.hide)
      .on('click', function (d, i) {
        console.log("Layer 3 " + "Node " + i);
      })


    this.svg3.append("text")
      .attr("transform",
        "translate(" + (this.svg3.attr('width') / 2) + " ," +
        (20) + ")")
      .style("text-anchor", "middle")
      .text("Layer3 (P)")
      .attr('fill', "black")
      .attr('font-size', '20px')
  }
}
