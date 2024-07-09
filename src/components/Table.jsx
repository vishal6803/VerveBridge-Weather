import React from "react";

function Table({ weatherData }) {
  return (
    <div className="w-full flex">
      <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Date</th>
            <th>Temp</th>
            <th>Temp Max</th>
            <th>Temp Min</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {weatherData.days.map((day, index) => (
            <tr key={index} className="border">
              <td>{day.datetime}</td>
              <td>{parseInt(day.temp) + " °"}</td>
              <td>{parseInt(day.tempmax) + " °"}</td>
              <td>{parseInt(day.tempmin) + " °"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
