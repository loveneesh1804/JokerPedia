import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const Jokes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const boxRef = useRef();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://v2.jokeapi.dev/joke/Any?type=single&amount=10"
      );
      const data = await res.json();
      setData((prev) => [...prev, ...data.jokes]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      return setIsFetch(false);
    }
  };

  useEffect(() => {
    isFetch && fetchData();
  }, [isFetch]);

  useEffect(() => {
    let observer;
    let target;
    if (boxRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.unobserve(target);
            setIsFetch(true);
          }
        },
        { threshold: 1 }
      );

      target = boxRef.current.querySelector(":last-child");
      if (!target) return;

      observer.observe(target);
    }
    return () => {
      if (target) observer.unobserve(target);
      if (observer) observer.disconnect();
    };
  }, [data]);

  return (
    <div className="jokes">
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/128/9798/9798611.png"
          alt="ico-laugh"
        />
        <h1>Jokespedia</h1>
      </div>
      {data.length ? (
        <div className="main-body" tabIndex={1} ref={boxRef}>
          {data.map((el) => (
            <p key={el.id}>{el.joke}</p>
          ))}
          {loading ? <Loader /> : undefined}
        </div>
      ) : (
        <div className="dummy">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Jokes;
