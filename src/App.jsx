import "./App.css";
import Jokes from "./Jokes";

function App() {
  return (
    <>
      <Jokes />
      <p className="credit">
        Designed By Keyators
        <img
          src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
          alt="heart-ico"
          className="heart"
        />
      </p>
    </>
  );
}

export default App;
