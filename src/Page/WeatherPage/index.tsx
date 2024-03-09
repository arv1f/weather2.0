import { useGeoApi } from "../../contacts/geoApi";
import { useWeatherApi } from "../../contacts/weatherApi";
import "./style.css";
import { useParams } from "react-router-dom";

// const useGeoApiF = (city: string) => {
//   return useGeoApi(city);
// };

export const WeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  const geoData = useGeoApi(city!);
  if (geoData === undefined) return null;
  // const { latitude, longitude } = geoData.data.results[0];
  // const { data, isLoading } = useWeatherApi(latitude, longitude);
  // console.log(data);
  // console.log(geoData.data);
  // const latitude = geoData.data.results[0].latitude;
  // const longitude = geoData.data.results[0].longitude;

  // // const { data, isLoading } = useWeatherApi(latitude, longitude);
  // if (!data) return null;
  // console.log(data);

  return <div></div>;
};
//48.85341
//2.3488
