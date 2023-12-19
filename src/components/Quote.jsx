import { useEffect, useState } from "react";
import s from "./quote.module.css";

export default function Quote({ quotesArray }) {
  const [message, setMessage] = useState(
    quotesArray[Math.floor(Math.random() * quotesArray.length)]
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(quotesArray[Math.floor(Math.random() * quotesArray.length)]);
    }, 10000);
    return () => clearTimeout(timeout);
  });

  return (
    <div className={s.quotearea}>
      <div className={s.quote}>
        <div className={s.text}>{message.text}</div>
        <div className={s.author}>{message.author}</div>
      </div>
    </div>
  );
}
