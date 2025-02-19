import { useState } from "react";
import "./App.css";
import Jokes from "./Jokes";

function App() {
  const [darkMode, setDarkMode] = useState(()=>{
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === 'true';
  });

  return (
    <div className="body" style={{backgroundColor: darkMode ? "black" : "white"}}>
      <Jokes darkMode={darkMode} setDarkMode={setDarkMode} />
      <p className="credit" style={{color : !darkMode ? "black" : "white"}}>
        Designed By Keyators
        <img
          src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
          alt="heart-ico"
          className="heart"
        />
      </p>
    </div>
  );
}

export default App;
