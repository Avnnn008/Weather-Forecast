import { useEffect } from "react";
import s from "./background.module.css";

export default function Background({ bgRef, code, isDay }) {
  useEffect(() => {
    let bgImg;
    switch (code) {
      case 1000:
        bgImg = isDay ? "sunny" : "clear";
        break;
      case 1003:
        bgImg = isDay ? "partly_cloud_day" : "partly_cloud_night";
        break;
      case 1006:
        bgImg = isDay ? "clouds_day" : "clouds_night";
        break;
      case 1009:
        bgImg = "overcast";
        break;
      case 1114:
      case 1030:
      case 1135:
      case 1147:
        bgImg = isDay ? "fog_day" : "fog_night";
        break;
      case 1087:
      case 1273:
      case 1276:
      case 1279:
      case 1282:
        bgImg = "storm";
        break;
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1237:
      case 1240:
      case 1243:
      case 1246:
      case 1261:
      case 1264:
        bgImg = isDay ? "rain_day" : "rain_night";
        break;
      case 1063:
      case 1150:
      case 1153:
      case 1180:
      case 1183:
        bgImg = "little_rain";
        break;
      case 1072:
      case 1168:
      case 1171:
        bgImg = "little_rain_snow";
        break;
      case 1069:
      case 1204:
      case 1207:
      case 1249:
      case 1252:
        bgImg = isDay ? "snowrain_day" : "snowrain_night";
        break;
      case 1066:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1255:
        bgImg = isDay ? "snow_day" : "snow_night";
        break;
      case 1117:
      case 1222:
      case 1225:
      case 1258:
        bgImg = isDay ? "big_snow_day" : "big_snow_night";
        break;
      default:
        break;
    }
    if (bgImg)
      bgRef.current.style.backgroundImage = `url(/Weather-Forecast/${bgImg}.jpg)`;
  }, [code]);

  return <div className={s.background} ref={bgRef}></div>;
}
