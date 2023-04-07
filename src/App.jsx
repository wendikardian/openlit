import "./App.css";
import Header from "./landing_page/Header";
import Jumbotron from "./landing_page/Jumbotron";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
function LandingPage() {
  return (
    <div>
      <Header />
      <Jumbotron />
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LandingPage} />
        <Route  path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
