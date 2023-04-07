import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./landing_page/Header";
import Jumbotron from "./landing_page/Jumbotron";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div >
      <Header />
      <Jumbotron />
    </div>
  );
}

export default App;
