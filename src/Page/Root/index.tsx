import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import { useMainStore } from "../../store";
import { ChangeEvent, useState } from "react";

export const HomePage = () => {
  const { isThemeDark, toggleTheme, setLocation } = useMainStore();
  const useGeo = () => {
    const showPosition = (position: {
      coords: { latitude: any; longitude: any };
    }) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setLocation(lat, lon);
      myNavigator(`/weather/${lat},${lon}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const myNavigator = useNavigate();
  const sityList = [
    "Moscow",
    "London",
    "Paris",
    "Penza",
    "Tokyo",
    "New York",
    "Berlin",
    "Minsk",
    "Vladivostok",
    "Saratov",
    "Санкт-Петербург",
    "Ростов-на-Дону",
  ];
  const [value, setValue] = useState<string>("");
  return (
    <div className={`root-cont ${isThemeDark ? "dark-theme" : "light-theme"}`}>
      <div className="left-panel">
        <div className="theme_container">
          <h3>My Weth</h3>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => toggleTheme()}
              className="switch__input"
              defaultChecked={isThemeDark}
            />
            <span className="switch__slider"></span>
          </label>
        </div>
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Search / add City"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
          />
          <button
            className="button"
            type="submit"
            onClick={() => value !== "" && myNavigator(`/weather/${value}`)}
          >
            <img src="https://www.pngall.com/wp-content/uploads/8/Vector-Search.png" />
          </button>
        </form>
        <ul className="sity_list">
          <li>
            <NavLink className="sity_link" onClick={() => useGeo()} to={"/"}>
              Use my location
            </NavLink>
          </li>
          {sityList
            .filter((el) =>
              value !== ""
                ? el.toLowerCase().includes(value.toLowerCase())
                : el,
            )
            .map((sity) => (
              <li key={sity}>
                <NavLink to={`/weather/${sity}`} className="sity_link">
                  {sity}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
