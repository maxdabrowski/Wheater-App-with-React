import React from "react";
import "./Result.css";
import Icon from "./Icon";
import image from "../images/sunrise-sunset.jpg";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faIgloo,
  faWind,
  faBolt,
  faCloud,
  faTemperatureHigh
} from "@fortawesome/free-solid-svg-icons";

library.add(faIgloo, faWind, faBolt, faCloud, faTemperatureHigh);

const Result = props => {
  const {
    error,
    city,
    date,
    time,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    clouds,
    icon
  } = props.weather;

  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    content = (
      <>
        <h3>{city.toUpperCase()}</h3>
        <div>
          <h4 className="left"> {date}</h4>
          <h4 className="right">{time}</h4>
        </div>
        <div className="icon">
          <Icon icon={icon} />
        </div>
        <div>
          <h4 className="left">
            <FontAwesomeIcon icon="temperature-high" /> {Math.round(temp)}
            &#176;C
          </h4>
          <h4 className="right">
            {" "}
            <FontAwesomeIcon icon="wind" /> {wind} m/s{" "}
          </h4>
        </div>
        <div>
          <h4 className="left">
            {" "}
            <FontAwesomeIcon icon="cloud" /> {clouds} %
          </h4>
          <h4 className="right">
            <FontAwesomeIcon icon="bolt" />
            {pressure} hPa
          </h4>
        </div>
        <div>
          <h4 className="sunrise"> Wschód: {sunriseTime}</h4>
          <h4 className="sunset">Zachód: {sunsetTime}</h4>
          <img src={image} alt="sunrise_sunset" />
        </div>
      </>
    );
  }

  return (
    <div className="result">{error ? `Nie mamy w bazie ${city}` : content}</div>
  );
};
export default Result;
