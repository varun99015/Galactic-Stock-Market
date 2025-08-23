import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Chart = ({ symbol }) => {
  const svgRef = useRef();
  const wrapperRef = useRef(); // Ref for the container div
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("5y");
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Effect for fetching data (with caching)
  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      const cacheKey = `chartData-${symbol}-${interval}`;
      try {
        const cachedItem = localStorage.getItem(cacheKey);
        if (cachedItem) {
          const { timestamp, data } = JSON.parse(cachedItem);
          const now = new Date();
          const lastReset = new Date();
          lastReset.setHours(23, 30, 0, 0);
          if (now < lastReset) {
            lastReset.setDate(lastReset.getDate() - 1);
          }
          if (timestamp > lastReset.getTime()) {
            console.log(`✅ Loading ${symbol} (${interval}) chart from cache.`);
            const formattedCachedData = data.map(d => ({ ...d, date: new Date(d.date) }));
            setData(formattedCachedData);
            setIsLoading(false);
            return;
          }
        }
        setIsLoading(true);
        const res = await axios.get(`/api/stocks/data/${symbol}?interval=${interval}`);
        const formattedData = res.data.map((d) => ({
          date: new Date(d.date),
          price: d.price,
        }));
        const newCacheItem = { timestamp: Date.now(), data: formattedData };
        localStorage.setItem(cacheKey, JSON.stringify(newCacheItem));
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [symbol, interval]);

  // Effect for drawing the chart
  useEffect(() => {
    if (!data.length || dimensions.width === 0) return;

    const { width, height } = dimensions;
    const margin = { top: 30, right: 20, bottom: 40, left: 50 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    svg.attr("width", width).attr("height", height);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.price) * 0.95, d3.max(data, d => d.price) * 1.05])
      .range([height - margin.bottom, margin.top]);

    // Draw Gridlines
    svg.append("g").attr("class", "grid")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(-height + margin.top + margin.bottom).tickFormat(""))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#00ffcc").attr("stroke-opacity", 0.1));

    svg.append("g").attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-width + margin.left + margin.right).tickFormat(""))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#00ffcc").attr("stroke-opacity", 0.1));

    // Draw Axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%b '%y")))
      .selectAll("text").style("fill", "#00ffcc").style("font-family", "monospace").style("font-size", "10px");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text").style("fill", "#00ffcc").style("font-family", "monospace").style("font-size", "10px");

    // Draw Line and Area
    const line = d3.line().x(d => xScale(d.date)).y(d => yScale(d.price)).curve(d3.curveMonotoneX);
    const area = d3.area().x(d => xScale(d.date)).y0(height - margin.bottom).y1(d => yScale(d.price)).curve(d3.curveMonotoneX);
    
    const gradientId = `gradient-${symbol}-${interval}`;
    const gradient = svg.append("defs").append("linearGradient").attr("id", gradientId).attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#00ffcc");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#00ffcc").attr("stop-opacity", 0.1);

    svg.append("path").datum(data).attr("fill", `url(#${gradientId})`).attr("fill-opacity", 0.2).attr("d", area);
    svg.append("path").datum(data).attr("fill", "none").attr("stroke", `url(#${gradientId})`).attr("stroke-width", 2).attr("d", line);

    // Tooltip logic
    const tooltip = d3.select("body").append("div").attr("class", "chart-tooltip").style("position", "absolute").style("visibility", "hidden").style("background", "rgba(0, 20, 30, 0.9)").style("border", "1px solid #00ffcc").style("border-radius", "5px").style("padding", "8px").style("color", "#fff").style("font-family", "monospace").style("z-index", 1000).style("pointer-events", "none");
    const focusCircle = svg.append("circle").attr("r", 5).attr("fill", "#00ffff").attr("stroke", "black").attr("stroke-width", 1.5).style("opacity", 0);

    svg.append("rect")
      .attr("width", width).attr("height", height)
      .style("fill", "none").style("pointer-events", "all")
      .on("mousemove", (event) => {
        const [xCoord] = d3.pointer(event);
        const bisectDate = d3.bisector(d => d.date).left;
        const x0 = xScale.invert(xCoord);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        
        focusCircle.style("opacity", 1).attr("cx", xScale(d.date)).attr("cy", yScale(d.price));
        tooltip.style("visibility", "visible")
          .html(`<div>${d.date.toLocaleDateString()}</div><div style="font-size: 1.2em; color: #00ffcc;">$${d.price.toFixed(2)}</div>`)
          .style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 15) + "px");
      })
      .on("mouseout", () => {
        focusCircle.style("opacity", 0);
        tooltip.style("visibility", "hidden");
      });

  }, [data, dimensions, symbol, interval]);

  // Effect for handling resize
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setDimensions({ width, height: width > 768 ? 350 : 300 }); // Adjust height for mobile
      }
    });
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 md:p-6 rounded-lg bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-cyan-300 font-mono tracking-wider mb-4 md:mb-0">
          {symbol} QUANTUM CHART
        </h2>
        <div className="flex gap-2 flex-wrap">
          {["1m", "3m", "6m", "1y", "5y"].map((range) => (
            <button key={range} onClick={() => setInterval(range)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-mono border transition-all duration-300 ${
                interval === range 
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/30" 
                  : "bg-gray-800/50 text-cyan-300 border-cyan-700 hover:border-cyan-500 hover:bg-cyan-900/30"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div ref={wrapperRef} className="w-full h-[300px] md:h-[350px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-mono">LOADING QUANTUM DATA...</p>
            </div>
          </div>
        ) : data.length ? (
          <svg ref={svgRef} className="w-full h-full border border-cyan-500/20 rounded-lg p-2 bg-black/30" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-cyan-600 font-mono">QUANTUM DATA STREAM OFFLINE</p>
          </div>
        )}
      </div>

      {data.length > 0 && !isLoading && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="text-center p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
            <div className="text-cyan-400">CURRENT</div>
            <div className="text-white text-lg">${data[data.length - 1].price.toFixed(2)}</div>
          </div>
          <div className="text-center p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
            <div className="text-cyan-400">CHANGE</div>
            <div className={`text-lg ${data[data.length - 1].price >= data[0].price ? 'text-green-400' : 'text-red-400'}`}>
              {((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
            <div className="text-cyan-400">VOLATILITY</div>
            <div className="text-white text-lg">HIGH</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;