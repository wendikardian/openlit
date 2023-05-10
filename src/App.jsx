import "./App.css";
import Header from "./landing_page/Header";
import Jumbotron from "./landing_page/Jumbotron";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import DashboardBook from "./Book/DashboardBook";

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
        <Route  path="/register" Component={Register} />
        <Route  path="/book/dashboard" Component={DashboardBook} />
      </Routes>
    </Router>
  );
}

export default App;
