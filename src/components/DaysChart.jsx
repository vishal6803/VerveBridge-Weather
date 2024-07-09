import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

function DaysChart({ weatherData }) {
  if (!weatherData || !weatherData.days) {
    // Display a loading indicator or message if data is not available yet
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AreaChart
        width={1000}
        height={500}
        data={weatherData.days}
        margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="tempmin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#52b788" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#52b788" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="tempmax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e5383b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fad643" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="tempmax"
          stroke="#ba181b"
          fillOpacity={1}
          fill="url(#tempmax)"
        />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#ffd100"
          fillOpacity={1}
          fill="url(#temp)"
        />
        <Area
          type="monotone"
          dataKey="tempmin"
          stroke="#40916c"
          fillOpacity={1}
          fill="url(#tempmin)"
        />
      </AreaChart>
    </div>
  );
}

export default DaysChart;
