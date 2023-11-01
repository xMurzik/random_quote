import React, { useEffect, useRef, useState, useCallback } from "react";
import randomColor from "randomcolor";
import { FaQuoteLeft } from "react-icons/fa";
import { IQuote } from "./quoye-card-types";
import { MAIN_API } from "../../constants/api";
import s from "./quote-card.module.scss";

interface IQuoteCardProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const QuoteCard: React.FC<IQuoteCardProps> = ({ color, setColor }) => {
  const [quote, setQuote] = useState<IQuote | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const h5Quote = useRef<HTMLHeadingElement | null>(null);
  const h3Author = useRef<HTMLDivElement | null>(null);
  const buttonNewQuoteRef = useRef<HTMLButtonElement | null>(null);

  const fetchQuote = useCallback(async () => {
    fetch(MAIN_API, { method: "GET" })
      .then((res) => res.json())
      .then((ans) => {
        setQuote(ans);
        setTimeout(() => {
          if (h5Quote.current) {
            h5Quote.current.style.opacity = "1";
          }
          if (h3Author.current) {
            h3Author.current.style.opacity = "1";
          }
        }, 300);
      });
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.color = color;
    }

    if (buttonNewQuoteRef.current) {
      buttonNewQuoteRef.current.style.backgroundColor = color;
    }
  }, [color]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const onClickNewQuote = async () => {
    if (h5Quote.current && h3Author.current) {
      h5Quote.current.style.opacity = "0";
      h3Author.current.style.opacity = "0";
      await fetchQuote();
      setColor(randomColor());
    }
  };

  return (
    <div ref={divRef} className={s["card"]}>
      <h5 ref={h5Quote} className={s["title-quote"]}>
        <FaQuoteLeft /> {quote?.quote}
      </h5>
      <h3 ref={h3Author} className={s["title-author"]}>
        -{quote?.author}
      </h3>
      <button
        ref={buttonNewQuoteRef}
        className={s["button-new-quote"]}
        onClick={onClickNewQuote}
      >
        New quote
      </button>
    </div>
  );
};

export default QuoteCard;
