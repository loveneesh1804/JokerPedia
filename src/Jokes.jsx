import React, { useEffect, useRef, useState } from "react";
import { DarkModeIco, LightModeIco } from "./assets/Icons";
import Loader from "./Loader";

const Jokes = ({ darkMode, setDarkMode }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [isOver, setIsOver] = useState(false);
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
  }, [data,darkMode]);

  const handleChange = () => {
    setDarkMode((prev) =>{
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  const isDarkModeBackground = () => (darkMode ? "black" : "white");
  const isDarkModeText = () => (!darkMode ? "black" : "white");

  return (
    <div
      className="jokes"
      style={{
        backgroundColor: isDarkModeBackground(),
        border: darkMode ? "1px solid #001B18" : "",
      }}
    >
      <div
        className="header"
        style={{
          borderBottom: `1px solid ${darkMode ? "#001B18" : "#efefef"}`,
        }}
      >
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9798/9798611.png"
            alt="ico-laugh"
          />
          <h1 style={{ color: isDarkModeText() }}>Jokespedia</h1>
        </div>
        <div
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          style={{
            backgroundColor:
              isOver && darkMode
                ? "#18181B"
                : isOver && !darkMode
                ? "#F4F4F5"
                : "transparent",
          }}
          onClick={handleChange}
        >
          {darkMode ? <DarkModeIco /> : <LightModeIco />}
        </div>
      </div>
      {data.length ? (
        <div
          style={{ scrollbarColor: darkMode ? "#6B6B6B #2C2C2C" : "auto" }}
          className="main-body"
          tabIndex={1}
          ref={boxRef}
        >
          {data.map((el) => (
            <p
              style={{
                color: isDarkModeText(),
                border: `1px solid ${darkMode ? "#001B18" : "#efefef"}`,
              }}
              key={el.id + Math.random()}
            >
              {el.joke}
            </p>
          ))}
          {loading ? <Loader /> : undefined}
        </div>
      ) : (
        <div
          className="dummy"
          style={{ scrollbarColor: darkMode ? "#6B6B6B #2C2C2C" : "auto" }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Jokes;
