import { useState } from "react";
import s from "./weather.module.css";

export default function Weather({ weatherData }) {
  const [tempInCels, setTempInCels] = useState(true);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Сейчас</h1>
        <h2 className={s.city}>{weatherData.city}</h2>
      </div>
      <div className={s.weather}>
        {weatherData.condition && (
          <div className={s.condition}>
            <img
              src={weatherData.condition.icon}
              alt="иконка с изображением текущих погодных условий"
            />
            <p>{weatherData.condition.text}</p>
          </div>
        )}
        <div className={s.current}>
          <h2>
            {tempInCels
              ? weatherData.temp_c > 0
                ? `+${weatherData.temp_c}`
                : weatherData.temp_c
              : weatherData.temp_f > 0
              ? `+${weatherData.temp_f}`
              : weatherData.temp_f}
          </h2>
          <h2
            className={s.units}
            onClick={() => setTempInCels((prev) => !prev)}
          >
            {tempInCels ? "°C" : "°F"}
          </h2>
        </div>
        <div className={s.feels}>
          По ощущениям{" "}
          {tempInCels
            ? `${
                weatherData.feels_c > 0
                  ? `+${weatherData.feels_c}`
                  : weatherData.feels_c
              }°C`
            : `${
                weatherData.feels_f > 0
                  ? `+${weatherData.feels_f}`
                  : weatherData.feels_f
              }°F`}
        </div>
        <div className={s.values}>
          <div>Ветер {weatherData.wind} м/с</div>
          <div>Давление {weatherData.pressure} мм.рт.ст.</div>
        </div>
      </div>
    </div>
  );
}
