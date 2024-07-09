import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import Chart from "./components/Chart";
import SvgComponent from "./components/SvgComponent";
import { LocationContext } from "./context/context";
import DaysChart from "./components/DaysChart";
import WindDirection from "./components/WindDirection";
import Table from "./components/Table";
function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const fetchWeatherData = () => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=PA4T33H2AZFMRQJ69LUUG85KC&contentType=json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        return response.json();
      })
      .then((data) => {
        console.log(location);
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />

      {loading && (
        <div className="flex justify-center content-center mt-64">
          <SvgComponent />
        </div>
      )}
      {weatherData && (
        <div className="sm:grid sm:grid-cols-2 bg-blue-300  mx-auto   p-7 gap-2">
          <div className="w-full bg-transparent  text-center mb-2">
            <h1 className="text-4xl">
              <i className="fa-solid fa-location-dot text-2xl"></i>{" "}
              {weatherData.address}
            </h1>
            <p>{weatherData.resolvedAddress}</p>
          </div>
          <div className="w-full bg-transparent  text-center mb-2">
            <h1 className="text-5xl">
              {parseInt(weatherData.currentConditions.temp)}°
            </h1>
            <p>
              {weatherData.currentConditions.conditions}{" "}
              <span className="my-3">
                {parseInt(weatherData.days[0].tempmax)}° /
                {parseInt(weatherData.days[0].tempmin)}°
              </span>
            </p>
          </div>
          <div className="w-full bg-blue-400 p-3 rounded-md text-white divide-y divide-blue-300 mb-2">
            <div className="my-3">
              Humidity
              <span className="float-end me-2 font-semibold ">
                {" "}
                {parseInt(weatherData.currentConditions.humidity)}%
              </span>
            </div>
            <div className="my-3">
              Feels like
              <span className="float-end me-2 font-semibold">
                {" "}
                {parseInt(weatherData.currentConditions.feelslike)}°
              </span>
            </div>
            <div className="my-3">
              UV
              <span className="float-end me-2 font-semibold">
                {" "}
                {parseInt(weatherData.currentConditions.uvindex)}
              </span>
            </div>
            <div className="my-3">
              Pressure
              <span className="float-end me-2 font-semibold">
                {parseInt(weatherData.currentConditions.pressure)}
                <sub>mbar</sub>
              </span>
            </div>
            <div className="my-3">
              Visibility
              <span className="float-end me-2 font-semibold">
                {parseInt(weatherData.currentConditions.visibility)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-blue-400 flex justify-around items-center rounded-md text-white mb-2 p-3">
            <div>
              Wind Speed --
              <span className="font-bold">
                {weatherData.currentConditions.windspeed}km/h
              </span>{" "}
              <br />
              Wind Direction --
              <span className="font-bold">
                {weatherData.currentConditions.winddir} deg
              </span>
            </div>
            <div>
              <WindDirection degree={weatherData.currentConditions.winddir} />
            </div>
          </div>
          <div className="w-full col-span-2 bg-blue-400 justify-around rounded-md text-white p-3 mb-3">
            <h2 className="mb-2">24 hour forecast</h2>
            <div className="overflow-x-scroll flex justify-center">
              {weatherData.days && <Chart weatherData={weatherData} />}
            </div>
          </div>
          <div className="w-full col-span-2 bg-blue-400 justify-around rounded-md text-white p-3 mb-2">
            <h2 className="mb-2">Toady's Max Min and Average Temprature</h2>
            <div className="overflow-x-scroll flex justify-center">
              {weatherData.days && <DaysChart weatherData={weatherData} />}
            </div>
          </div>
          <div className=" bg-blue-400 rounded-lg col-span-2 text-white w-full mb-2 p-3">
            <h2 className="mb-2">15 Days Forecast</h2>
            <div className="">
              <Table weatherData={weatherData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
