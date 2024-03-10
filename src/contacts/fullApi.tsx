import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFullApi = (city: string) => {
  const { data: geoData } = useQuery({
    queryKey: ["geo", city],
    queryFn: () =>
      axios
        .get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`,
        )
        .then((res) => res.data),
  });
  if (!geoData) {
    return useQuery({
      queryKey: ["null"],
      queryFn: () => {
        return null;
      },
    });
  }

  return useQuery({
    queryKey: [
      "geoWeather",
      String(geoData.results[0].latitude),
      String(geoData.results[0].longitude),
    ],
    queryFn: () =>
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${geoData.results[0].latitude}&longitude=${geoData.results[0].longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m`,
        )
        .then((res) => res.data),
  });
};
