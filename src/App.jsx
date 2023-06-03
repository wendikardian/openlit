import "./App.css";
import Header from "./landing_page/Header";
import Jumbotron from "./landing_page/Jumbotron";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import DashboardBook from "./Book/DashboardBook";
import Community from "./discovery/Community";
import Class from "./class/Class";
import Assistant from "./virtual_assist/Assistant";
import ProfilePage from "./profile/ProfilePage";
import BookDetail from "./Book/BookDetail";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const email = Cookies.get("email");
    if (email) {
      navigate("/profile");
    }
  }, []);
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
        <Route  path="/book/dashboard" exact Component={DashboardBook} />
        <Route  path="/book/:id"  Component={BookDetail} />
        <Route  path="/community" Component={Community} />
        <Route  path="/class/list" exact Component={Class} />
        <Route  path="/assistant" Component={Assistant} />
        <Route  path="/profile" Component={ProfilePage} />
      </Routes>
    </Router>
  );
}

export default App;
