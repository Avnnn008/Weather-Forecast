import { useState, useRef, useEffect } from "react";
import { QUOTES, HINT_MESSAGES, apiKey } from "./constants";
import Weather from "./components/Weather";
import Quote from "./components/Quote";
import Forecast from "./components/Forecast";
import Background from "./components/UI/Background";
import Loader from "./components/UI/Loader";
import s from "./App.module.css";

function App() {
  const bgRef = useRef(null);
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({})
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState(HINT_MESSAGES.empty);

  useEffect(() => {
    if (!Object.keys(weatherData).length) getWeatherData();
  }, []);

  async function getWeatherData() {
    setHint(HINT_MESSAGES.empty);
    setLoading(true)

    try {
      const response =  await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&lang=ru&days=3`
      );
      
      const data = await response.json();
      if (data.error) {
        setHint(`Ошибка при получении данных. Код ошибки: ${data.error.code}`)
        setLoading(false)
        return
      }
      setWeatherData({
        city: data.location.name,
        is_day: data.current.is_day,
        condition: data.current.condition,
        temp_c: Math.round(data.current.temp_c),
        temp_f: Math.round(data.current.temp_f),
        feels_c: Math.round(data.current.feelslike_c),
        feels_f: Math.round(data.current.feelslike_f),
        wind: Math.round(data.current.wind_kph / 3.6),
        pressure: Math.round(data.current.pressure_mb * 0.75),
      });
      setForecastData(data.forecast.forecastday)
      
      setLoading(false);
    } catch (e) {
      console.log(e)
      setLoading(false);
      setHint(`Произошла ошибка при получении данных: ${e.message}`);
    }
  }

  const mouseMoveHandler = (e) => {
    bgRef.current.style.transform =
      "translateX(-" + (e.clientX / innerWidth) * 5 + "%)";
  };

  const getQuotesArray = () => {
    let array = [...QUOTES.main];
    if (weatherData.temp_c <= -20) array = [...array, ...QUOTES.cold];
    if (weatherData.temp_c >= 28) array = [...array, ...QUOTES.hot];
    if (weatherData.condition) {
      if (/дождь|ливень|ливни|морось/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.rain];
    if (/гроз/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.storm];
    if (/снег/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.snow];
    if (/туман/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.fog];
    if (/облач/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.clouds];
    if (/пасмурно/i.test(weatherData.condition.text))
      array = [...array, ...QUOTES.overcast];
    }
    

    return array;
  };

  return (
    <div className={s.app}>
      <Background
        bgRef={bgRef}
        code={weatherData.condition ? weatherData.condition.code : ""}
        isDay={weatherData.is_day}
      />
      <div className={s.viewport} onMouseMove={(e) => mouseMoveHandler(e)}>
        {hint && <div className={s.hint}>{hint}</div>}
        {loading && <Loader />}
        {!!Object.keys(weatherData).length && (
          <Weather weatherData={weatherData} />
        )}
        {!!Object.keys(weatherData).length  && (
          <Quote quotesArray={getQuotesArray()} />
        )}
        {!!Object.keys(forecastData).length && <Forecast forecastData={forecastData}/>}
      </div>
    </div>
  );
}

export default App;
