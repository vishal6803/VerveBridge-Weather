import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
function Chart({ weatherData }) {
  const hoursData = [];
  function convertHour(time) {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    // date.setMinutes(minutes);

    const formatedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    return formatedTime;
  }
  const d = weatherData.days[0].hours;
  // console.log("d" + d);
  d.forEach((hour) => {
    // const time = ;
    hoursData.push({
      datetime: convertHour(hour.datetime),
      temp: hour.temp,
    });
  });
  return (
    <div className="">
      {weatherData.days && (
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={hoursData}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="datetime" interval="preserveEnd" />
            <YAxis tickFormatter={(value) => value + "°"} />
            <Tooltip contentStyle={{ backgroundColor: "grey" }} />
            <Legend />
            <Line type="" dataKey="temp" stroke="green" activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Chart;
