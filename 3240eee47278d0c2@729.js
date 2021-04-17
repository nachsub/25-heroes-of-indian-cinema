// https://observablehq.com/@nachsub/25-heroes-of-hindi-cinema-1932-2020@729
import define1 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["heroes@1.csv",new URL("./files/358f6675a87d37fe7619cbf006294ec652ba9a489dd9ae6a38d3e72008a58076afa4042796608adc45226b07f1dad185edc6cdd525477f699db47e11db87adab",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# 25 Heroes of Hindi Cinema, 1932–2020

Data: [IMDb](https:https://www.imdb.com/)`
)});
  main.variable(observer()).define(["swatches","color","margin"], function(swatches,color,margin){return(
swatches({color, columns: "160px 4", marginLeft: margin.left})
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","series","color","x","y","xAxis","yAxis"], function(d3,width,height,series,color,x,y,xAxis,yAxis)
{  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", ({key}) => color(key))
      .call(g => g.selectAll("rect")
        .data(d => d)
        .join("rect")
          .attr("x", d => x(d.data.year))
          .attr("y", d => y(d[1]))
          .attr("width", x.bandwidth() - 1)
          .attr("height", d => y(d[0]) - y(d[1]))
       .append("title")
          .text(d => `${d.data.name}, ${d.data.year}, ${d.data.value}`));

//${formatUnits(d.data.Units)}`));  

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("heroes@1.csv").text(), ({Actor, Year, ["Films"]: Films}) => ({name: Actor, year: +Year, value: +Films})), {y: "No. of Films"})
)});
  main.variable(observer("colors")).define("colors", function(){return(
new Map([
  ["Saigal", "#2A5784"],
  ["Prithviraj Kapoor", "#43719F"],
  ["Ashok Kumar", "#5B8DB8"],
  ["Raj Kapoor", "#7AAAD0"],
  ["Dilip Kumar", "#BADDF1"],	
  ["Rajendra Kumar", "#724C09"],
  ["Raaj Kumar", "#f2b955"],
  ["Shashi Kapoor", "#B6790E"],
  ["Shammi Kapoor", "#9BC7E4"],
  ["Dev Anand", "#FAB63D"],
  ["Guru Dutt", "#1B998B"],
  ["Jeetendra", "#CB7775"],
  ["Dharmendra", "#bec1d4"],
  ["Rajesh Khanna", "#DCA4A3"],
  ["Amitabh Bachchan", "#A10702"],
  ["Mithun Chakraborty", "#5B8388"],  
  ["Sanjay Dutt", "#F1CF63"], 
  ["Anil Kapoor", "#f6e2a1"], 
  ["Shah Rukh Khan", "#7C4D79"],
  ["Salman Khan", "#BE89AC"],
  ["Aamir Khan", "#D5A5C4"],
  ["Akshay Kumar", "#BBB1AC"],
  ["Shahid Kapoor", "#24693D"],
  ["Ranbir Kapoor", "#61AA57"],
  ["Ranveer Singh", "#B4E0A7"]
])
)});
  main.variable(observer("series")).define("series", ["d3","colors","data"], function(d3,colors,data){return(
d3.stack()
    .keys(Array.from(colors.keys()))
    .value((group, key) => group.get(key).value)
    .order(d3.stackOrderReverse)
  (Array.from(d3.rollup(data, ([d]) => d, d => d.year, d => d.name).values()))
    .map(s => (s.forEach(d => d.data = d.data.get(s.key)), s))
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleBand()
    .domain(data.map(d => d.year))
    .rangeRound([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("color")).define("color", ["d3","colors"], function(d3,colors){return(
d3.scaleOrdinal()
    .domain(Array.from(colors.keys()))
    .range(Array.from(colors.values()))
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 80))
        .tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)});
  main.variable(observer("height")).define("height", function(){return(
700
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 30, bottom: 30, left: 30}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-array@2")
)});
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  return main;
}
