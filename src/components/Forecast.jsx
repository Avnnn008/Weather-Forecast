import { useMemo } from "react";
import s from "./forecast.module.css";

export default function Forecast({ forecastData }) {
  const weather = useMemo(() => {
    return [
      ...forecastData[0].hour.filter(
        (el, index) =>
          el.time_epoch * 1000 > Date.now() && (index === 0 || index % 3 === 0)
      ),
      ...forecastData[1].hour.filter(
        (el, index) => index === 0 || index % 3 === 0
      ),
    ].slice(0, 9);
  }, [forecastData]);

  return (
    <div className={s.container}>
      <div className={s.today}>
        <div className={s.list}>
          {weather &&
            !!weather.length &&
            weather.map((hourObj) => (
              <div key={hourObj.time_epoch} className={s.hourData}>
                <div>{hourObj.time.split(" ")[1]}</div>
                <img src={hourObj.condition.icon} alt="" />
                <div>
                  {Math.round(hourObj.temp_c) > 0
                    ? `+${Math.round(hourObj.temp_c)}`
                    : Math.round(hourObj.temp_c)}
                  °C
                </div>
                <div>{Math.round(hourObj.wind_kph / 3.6)} м/с</div>
                <div>
                  {Math.round(hourObj.pressure_mb * 0.75)}
                  <span className={s.unit}> мм.рт.ст.</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={s.future}>
        <div className={s.title}>
          <div>Дата</div>
          <div>Условия</div>
          <div>
            Мин <div className={s.unit}>°C</div>
          </div>
          <div>
            Макс <div className={s.unit}>°C</div>
          </div>
          <div>
            Ветер <div className={s.unit}>м/с</div>
          </div>
          <div>
            Давление
            <div className={s.unit}>мм.рт.ст.</div>
          </div>
        </div>
        {forecastData.map((dayObj) => (
          <div key={dayObj.date_epoch} className={s.weatherLine}>
            <div className={s.date}>
              <div>
                {new Date(dayObj.date_epoch * 1000).toLocaleString("ru", {
                  weekday: "short",
                })}
              </div>
              <div>
                {new Date(dayObj.date_epoch * 1000).toLocaleString("ru", {
                  day: "2-digit",
                  month: "short",
                })}
              </div>
            </div>
            <div className={s.condition}>
              <img src={dayObj.day.condition.icon} alt="" />
              <div>{dayObj.day.condition.text}</div>
            </div>
            <div>
              {Math.round(dayObj.day.mintemp_c) > 0
                ? `+${Math.round(dayObj.day.mintemp_c)}`
                : Math.round(dayObj.day.mintemp_c)}
            </div>
            <div>
              {Math.round(dayObj.day.maxtemp_c) > 0
                ? `+${Math.round(dayObj.day.maxtemp_c)}`
                : Math.round(dayObj.day.maxtemp_c)}
            </div>
            <div>
              {(
                Math.min(...dayObj.hour.map((el) => el.wind_kph)) / 3.6
              ).toFixed(0)}{" "}
              -{" "}
              {(
                Math.max(...dayObj.hour.map((el) => el.wind_kph)) / 3.6
              ).toFixed(0)}
            </div>
            <div>
              {(
                dayObj.hour.reduce(
                  (acc, curr) => acc + curr.pressure_mb * 0.75,
                  0
                ) / dayObj.hour.length
              ).toFixed(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
