import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useWeatherApi = (
  latitude: Float64Array,
  longitude: Float64Array,
) => {
  return useQuery({
    queryKey: ["geoWeather", String(latitude), String(longitude)],
    queryFn: () =>
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`,
        )
        .then((res) => res.data.hourly.temperature_2m[0]),
  });
};
