import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useWeatherApi = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ["geoWeather", String(latitude), String(longitude)],
    queryFn: () =>
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m`,
        )
        .then((res) => res.data),
  });
};
