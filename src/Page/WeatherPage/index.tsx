import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "../../store";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export const WeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  const { location } = useMainStore();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["geoWeather", city],
    queryFn: async () => {
      if (city!.includes(",")) {
        if (location.latitude && location.longitude) {
          return await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,pressure_msl,visibility,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`,
          );
        }
      }
      const data = await axios
        .get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`,
        )
        .then((res) => res.data);
      const { latitude, longitude } = data.results[0];
      return await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,pressure_msl,visibility,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`,
      );
    },
    select: (res) => res!.data,
  });
  const navigator = useNavigate();
  return (
    <div className="weather_page">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
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
            {data.daily.time.map(
              (
                element:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined,
                index: number,
              ) => (
                <div key={index}>
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
                  />{" "}
                  {data.daily.wind_speed_10m_max[index]}
                  {data.current_units.wind_speed_10m}
                  <br />
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699966-icon-1-cloud-1024.png"
                    alt="cloud density: "
                    style={{ width: "1rem" }}
                  />{" "}
                  {data.daily.precipitation_sum[index]}mm
                </div>
              ),
            )}
            <button className="close" onClick={() => navigator("/")}>
              Close
            </button>
          </div>
        </>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};
