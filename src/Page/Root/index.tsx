import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
import { useMainStore } from "../../store";
export const HomePage = () => {
  const sityList = ["Moscow", "London", "Paris", "Berlin"];
  const { isThemeDark, toggleTheme } = useMainStore();
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
        <input
          type="text"
          className="search_city"
          placeholder="Search City"
        ></input>
        <ul className="sity_list">
          {sityList.map((sity) => (
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
