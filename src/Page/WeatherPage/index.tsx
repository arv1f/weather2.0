import { useState } from "react";
import { useFullApi } from "../../contacts/fullApi";
import { useWeatherApi } from "../../contacts/weatherApi";
import { useMainStore } from "../../store";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const useLocation = (city: string) => {
  if (city.includes(",")) {
    const { location } = useMainStore();
    console.log(location);
    if (location.latitude && location.longitude) {
      return useWeatherApi(location.latitude, location.longitude);
    }
  } else {
    return useFullApi(city!);
  }
};

export const WeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  const { data, isLoading, error, isError } = useLocation(city!);
  console.log(data);
  const navigator = useNavigate();
  return (
    <div className="weather_page">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error}</div>
      ) : data ? (
        <>
          <h3 className="city">Geo: {city} </h3>
          <div className="weather_now">
            <h3>now:</h3>
            <div className="weather_now_data">
              <h1>
                {data.current.temperature_2m}{" "}
                {data.current_units.temperature_2m}
              </h1>
              <div>
                {" "}
                feels: {data.current.apparent_temperature}{" "}
                {data.current_units.apparent_temperature}
              </div>
              <div>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-1024.png"
                  alt="cloud density: "
                />{" "}
                {data.current.cloud_cover}%
              </div>
              <div>
                <img
                  src="https://htc-msk.ru/uploads/category/351/menu_vetrozashit.png"
                  alt="wind speed: "
                />{" "}
                {data.current.wind_speed_10m}
                {data.current_units.wind_speed_10m}
              </div>
            </div>
          </div>
          <div className="weather_forecast">
            {data.daily.time.map((element, index) => (
              <div>
                {element}:<br />
                <img
                  src={
                    "https://cdn2.iconfinder.com/data/icons/weather-colored-icons/47/weather_70-1024.png"
                  }
                  style={{ width: "1rem" }}
                />{" "}
                {data.daily.temperature_2m_min[index]}
                {data.current_units.temperature_2m}
                <br />
                <img
                  src="https://static-shpf1.mageworx.com/img/uploads/productoptions/2330/9ec9d69711092acb8dc4e1ea404cc53d.png"
                  style={{ width: "1rem" }}
                />{" "}
                {data.daily.temperature_2m_max[index]}
                {data.current_units.temperature_2m}
                <br />
                <img
                  src="https://htc-msk.ru/uploads/category/351/menu_vetrozashit.png"
                  alt="wind speed: "
                  style={{ width: "1rem" }}
                />
                {data.daily.wind_speed_10m_max[index]}
                {data.current_units.wind_speed_10m}
                <br />
                <img
                  src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-1024.png"
                  alt="cloud density: "
                  style={{ width: "1rem" }}
                />
                {data.daily.precipitation_sum[index]}mm
              </div>
            ))}
            <button className="close" onClick={() => navigator("/")}>
              Close
            </button>
          </div>
        </>
      ) : (
        <div>No data</div>
      )}

      {/* {isLoading ? (
        <div>
          City data is being downloaded. Please wait 10 seconds. If it does not
          load, please read the last sentence again.
        </div>
      ) : data ? (
        <div>
          <h2>{city}:</h2>
          <div className="weather_inData">
            <h1>
              {data.current.temperature_2m} {data.current_units.temperature_2m}
            </h1>
            <div className="weather_info">
              <br />
              It feels like: {data.current.apparent_temperature}{" "}
              {data.current_units.apparent_temperature}
              <br />
              Cloud density: {data.current.cloud_cover}%
              <br />
              Wind speed: {data.current.wind_speed_10m}
              {data.current_units.wind_speed_10m}
              <br />
              Wind direction: {data.current.wind_direction_10m}
              {data.current_units.wind_direction_10m}
              <br />
              Relative humidity: {data.current.relative_humidity_2m}
              {data.current_units.relative_humidity_2m}
              <br />
              Pressure: {data.current.surface_pressure}
              {data.current_units.surface_pressure}
            </div>
            <button className="close" onClick={() => navigator("/")}>
              Close
            </button>
          </div>
        </div>
      ) : (
        isError && <div>{error.message}</div>
      )} */}
    </div>
  );
};
