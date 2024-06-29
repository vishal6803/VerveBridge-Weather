import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import Chart from "./components/Chart";
import SvgComponent from "./components/SvgComponent";
import { LocationContext } from "./context/context";
import DaysChart from "./components/DaysChart";
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
      <div className="container mx-auto p-4 mt-8">
        {weatherData && (
          <>
            <div className="mx-auto p-4 h-screen  flex justify-center">
              <div className="flex flex-wrap">
                <div className="w-full   px-2">
                  <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-white dark:bg-gray-600">
                    <div className="px-6 py-6 relative">
                      <div className="flex mb-4 justify-between items-center">
                        <div>
                          <h5 className="mb-0 font-medium text-xl">
                            {weatherData.address}
                          </h5>
                          <h6 className="mb-0">
                            {weatherData.days[0].datetime}
                          </h6>
                          <small>{weatherData.currentConditions.icon}</small>
                        </div>
                        <div className="text-right">
                          <h3 className="font-bold text-4xl mb-0">
                            <span>
                              <i class="fa-solid fa-temperature-half"></i>{" "}
                              {parseInt(weatherData.currentConditions.temp)}°
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="block sm:flex justify-between items-center flex-wrap">
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Temp</span>
                            <small className="px-2 inline-block">
                              39.11&nbsp;°
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Feels like</span>
                            <small className="px-2 inline-block">
                              {parseInt(
                                weatherData.currentConditions.feelslike
                              )}
                              &nbsp;°
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Temp min</span>
                            <small className="px-2 inline-block">
                              {parseInt(weatherData.days[0].tempmin)}&nbsp;°
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Temp max</span>
                            <small className="px-2 inline-block">
                              39&nbsp;°
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap">
                      <span className="inline-block px-3">
                        {/* <small>Forecast</small> */}
                      </span>
                    </div>
                    <div className="px-6 py-6 relative">
                      <div className="bg-gray-500 p-5 rounded-md">
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>humidity</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.humidity}&nbsp;%
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Pressure</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.pressure}&nbsp;mbar
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>UV</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.uvindex}&nbsp;
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Conditions</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.conditions}&nbsp;
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-6 relative">
                      <div className="bg-gray-500 p-5 rounded-md">
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Sunset</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.sunset}&nbsp;
                            </small>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <div className="flex mb-2 justify-between items-center">
                            <span>Sunrise</span>
                            <small className="px-2 inline-block">
                              {weatherData.currentConditions.sunrise}&nbsp;
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {weatherData && <Chart weatherData={weatherData} />}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Forecast of 15 days
              </h2>
              {/* <ul>
                {weatherData.days.map((day, index) => (
                  <li key={index}>
                    {day.datetime} - High: {day.tempmax}°C, Low: {day.tempmin}
                    °C
                  </li>
                ))}
              </ul> */}
              <div className="w-full flex">
                <table className="w-1/3 text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th>Date</th>
                      <th>Temp</th>
                      <th>Temp Max</th>
                      <th>Temp Min</th>
                    </tr>
                  </thead>
                  <tbody>
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
                <div className="w-full mt-11">
                  {weatherData && <DaysChart weatherData={weatherData} />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
