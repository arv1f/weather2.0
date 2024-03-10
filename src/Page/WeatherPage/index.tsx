import { useFullApi } from "../../contacts/fullApi";
import "./style.css";
import { useParams } from "react-router-dom";

export const WeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  //if (!useFullApi(city!)) {return null}
  const { data, isLoading } = useFullApi(city!);
  // if (data !== null && data !== undefined) {
  //   console.log(data.current, data.current_units);
  // }
  return (
    <div className="weather_page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <div>
            <h2>{city}:</h2>
            <div className="weather_inData">
              <h1>
                {data.current.temperature_2m}{" "}
                {data.current_units.temperature_2m}
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
            </div>
          </div>
        )
      )}
    </div>
  );
};
