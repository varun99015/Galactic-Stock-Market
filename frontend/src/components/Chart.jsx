import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Chart = ({ symbol }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("5y");
  const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   const fetchData = async () => {
//     if (!symbol) return; // Don't fetch if no symbol is provided

//     // 1. Create a unique cache key for each stock and interval
//     const cacheKey = `chartData-${symbol}-${interval}`;
//     const cacheDuration = 15 * 60 * 1000; // Cache for 15 minutes

//     try {
//       // 2. Check the browser's cache first
//       const cachedItem = localStorage.getItem(cacheKey);
//       if (cachedItem) {
//         const { timestamp, data } = JSON.parse(cachedItem);
        
//         // 3. If the cached data is fresh, use it and skip the API call
//         if (Date.now() - timestamp < cacheDuration) {
//           console.log(`✅ Loading ${symbol} (${interval}) chart from cache.`);
//           const formattedCachedData = data.map(d => ({ ...d, date: new Date(d.date) }));
//           setData(formattedCachedData);
//           setIsLoading(false); // Make sure to update loading state
//           return; // Exit the function
//         }
//       }

//       // 4. If no fresh cache, fetch from the API
//       console.log(`... Fetching new ${symbol} (${interval}) chart data from API.`);
//       setIsLoading(true);
      
//       // ✅ FIX: Use the correct, relative API path
//       //const res = await axios.get(`/stocks/${symbol}?interval=${interval}`);
//       const res = await axios.get(`http://localhost:5000/api/stocks/data/${symbol}?interval=${interval}`);
//       const formattedData = res.data.map((d) => ({
//         date: new Date(d.date),
//         price: d.price,
//       }));

//       // 5. Save the new data to the cache for next time
//       const newCacheItem = {
//         timestamp: Date.now(),
//         data: formattedData,
//       };
//       localStorage.setItem(cacheKey, JSON.stringify(newCacheItem));
      
//       setData(formattedData);

//     } catch (err) {
//       console.error("Error fetching chart data:", err);
//       setData([]); // Clear data on error to avoid showing a stale chart
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchData();
// }, [symbol, interval]); 

useEffect(() => {
  const fetchData = async () => {
    if (!symbol) return;

    const cacheKey = `chartData-${symbol}-${interval}`;

    try {
      const cachedItem = localStorage.getItem(cacheKey);
      if (cachedItem) {
        const { timestamp, data } = JSON.parse(cachedItem);
        
        // --- NEW LOGIC: Calculate the last 11:30 PM reset time ---
        const now = new Date();
        const lastReset = new Date();
        lastReset.setHours(23, 30, 0, 0); // Set to 11:30 PM today

        // If it's already past 11:30 PM today, the last reset was today.
        // Otherwise, the last reset was at 11:30 PM yesterday.
        if (now < lastReset) {
          lastReset.setDate(lastReset.getDate() - 1);
        }
        
        // Check if the cache is still fresh (saved after the last reset)
        if (timestamp > lastReset.getTime()) {
          console.log(`✅ Loading ${symbol} (${interval}) chart from fresh daily cache.`);
          const formattedCachedData = data.map(d => ({ ...d, date: new Date(d.date) }));
          setData(formattedCachedData);
          setIsLoading(false);
          return; // Exit the function
        }
      }

      // If no fresh cache, fetch from the API
      console.log(`... Fetching new ${symbol} (${interval}) chart data from API.`);
      setIsLoading(true);
      
      const res = await axios.get(`/api/stocks/${symbol}?interval=${interval}`);
      
      const formattedData = res.data.map((d) => ({
        date: new Date(d.date),
        price: d.price,
      }));

      // Save the new data to the cache
      const newCacheItem = {
        timestamp: Date.now(),
        data: formattedData,
      };
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

  useEffect(() => {
    if (!data.length) return;

    const width = 700;
    const height = 350;
    const margin = { top: 30, right: 40, bottom: 50, left: 70 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    // Initialize scales FIRST
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.price) * 0.95, d3.max(data, d => d.price) * 1.05])
      .range([height - margin.bottom, margin.top]);

    // NOW create grid using the initialized scales
    // X Grid
// X Grid (no labels)
svg.append("g")
  .attr("class", "grid")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale)
    .ticks(6)
    .tickSize(-height + margin.top + margin.bottom) // extend ticks as grid lines
    .tickFormat("") // 👈 removes labels
  )
  .call(g => g.select(".domain").remove())
  .call(g => g.selectAll(".tick line")
    .attr("stroke", "#00ffcc")
    .attr("stroke-opacity", 0.2)
    .attr("stroke-dasharray", "2,2"));


    // Y Grid
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#00ffcc")
        .attr("stroke-opacity", 0.2)
        .attr("stroke-dasharray", "2,2")
        .attr("x2", width - margin.left - margin.right));

    // Add gradient for the line
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", `gradient-${symbol}`)
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#00ffcc")
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#00ffcc")
      .attr("stop-opacity", 0.3);

    // Draw the main line
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", `url(#gradient-${symbol})`)
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add area under the curve
    const area = d3.area()
      .x(d => xScale(d.date))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", `url(#gradient-${symbol})`)
      .attr("fill-opacity", 0.2)
      .attr("d", area);

    // Axes with sci-fi styling
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat("%b '%y")))
      .attr("class", "axis")
      .selectAll("text")
      .style("fill", "#00ffcc")
      .style("font-family", "monospace")
      .style("font-size", "11px");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6))
      .attr("class", "axis")
      .selectAll("text")
      .style("fill", "#00ffcc")
      .style("font-family", "monospace")
      .style("font-size", "11px");

    // Tooltip container
const tooltip = d3.select("body")
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0, 20, 30, 0.95)")
      .style("border", "1px solid #00ffcc")
      .style("border-radius", "6px")
      .style("padding", "10px")
      .style("color", "#00ffcc")
      .style("font-family", "monospace")
      .style("font-size", "12px")
      .style("backdrop-filter", "blur(10px)")
      .style("box-shadow", "0 0 20px rgba(0, 255, 204, 0.3)")
      .style("visibility", "hidden")
      .style("z-index", "1000")
      .style("pointer-events", "none");

svg.selectAll(".data-point")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "data-point")
  .attr("cx", d => xScale(d.date))
  .attr("cy", d => yScale(d.price))
  .attr("r", 0)
  .attr("fill", "#00ffcc")
  .attr("stroke", "#00ffcc")
  .attr("stroke-width", 2)
  .attr("opacity", 0)
  .on("mouseover", (event, d) => {
    // Enlarge point on hover
    d3.select(event.target)
      .transition()
      .duration(200)
      .attr("r", 8)
      .attr("fill", "#00ffff")
      .attr("filter", "url(#glow)");

    // Show tooltip
    tooltip.style("visibility", "visible")
      .html(`
        <div class="font-mono">
          <div class="text-[#00ffff] font-bold">${symbol}</div>
          <div class="text-white">${d.date.toLocaleDateString()}</div>
          <div class="text-2xl mt-1 text-[#00ffcc]">$${d.price.toFixed(2)}</div>
        </div>
      `)
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY - 15) + "px");
  })
  .on("mouseout", (event) => {
    // Shrink point
    d3.select(event.target)
      .transition()
      .duration(200)
      .attr("r", 4)
      .attr("fill", "#00ffcc")
      .attr("filter", "none");

    tooltip.style("visibility", "hidden");
  })
  .transition() // 👈 transition comes last
  .duration(1000)
  .attr("r", 4)
  .attr("opacity", 0);


    // Add glow filter for hover effects
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("width", "150%")
      .attr("height", "150%");

    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3.5")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "coloredBlur");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  }, [data, symbol]);

  return (
    <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-300 font-mono tracking-wider">
          {symbol} QUANTUM CHART
        </h2>
        
        <div className="flex gap-2">
          {["1m", "3m", "6m", "1y", "5y"].map((range) => (
            <button
              key={range}
              onClick={() => setInterval(range)}
              className={`px-4 py-2 rounded-md text-sm font-mono border transition-all duration-300 ${
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

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-400 font-mono">LOADING QUANTUM DATA...</p>
          </div>
        </div>
      ) : data.length ? (
        <div className="relative">
          <svg 
            ref={svgRef} 
            className="w-full h-96 border border-cyan-500/20 rounded-lg p-2 bg-black/30"
          />
          <div className="absolute bottom-4 left-4 text-xs text-cyan-400/70 font-mono">
            REAL-TIME ANALYSIS MODE: ACTIVE
          </div>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center">
          <p className="text-cyan-600 font-mono">QUANTUM DATA STREAM OFFLINE</p>
        </div>
      )}

      {/* Stats overlay */}
      {data.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs font-mono">
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
