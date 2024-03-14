import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useWeatherApi = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ["geoWeather", String(latitude), String(longitude)],
    queryFn: () =>
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,pressure_msl,visibility,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant`,
        )
        .then((res) => res.data),
  });
};
