import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { useWeatherApi } from "./weatherApi";

export const useGeoApi = (city: string) => {
  return useQuery({
    queryKey: ["geo", city],
    queryFn: () =>
      axios
        .get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`,
        )
        .then((res) => res.data),
    // .then((data) => {
    //   const { latitude, longitude } = data.results[0];
    //   return { latitude, longitude };
    // }),
  });
};
