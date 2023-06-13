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
import DataProvider from "./DataCtx/Datactx";
import EditPhoto from "./profile/EditPhoto";
import EditProfile from "./profile/EditProfile";
import ChangePassword from "./profile/ChangePassword";
import AddClass from "./class/AddClass";
import DetailClass from "./class/DetailClass";
import CreatePosting from "./discovery/CreatePosting";
import Comment from "./discovery/Comment";
import EditPosting from "./discovery/EditPosting";
import EnrollClass from "./class/EnrollClass";
import AddBook from "./Book/AddBook";
import ManageBook from "./Book/ManageBook";
import ReadBook from "./Book/ReadBook";
import Assesment from "./Book/Assesment";
import SummaryBook from "./Book/SummaryBook";
import Answer from "./Book/Answer";
import ManageClass from "./class/ManageClass";
import SeeClass from "./class/SeeClass";
import EditClass from "./class/EditClass";
import EditPhotoClass from "./class/EditPhotoClass";


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
      <DataProvider>
        <Routes>
          <Route exact path="/" Component={LandingPage} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/book/dashboard" exact Component={DashboardBook} />
          <Route path="/book/:id" Component={BookDetail} />
          <Route path="/community" Component={Community} />
          <Route path="/class/list" exact Component={Class} />
          <Route path="/assistant" Component={Assistant} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/edit-photo" Component={EditPhoto} />
          <Route path="/edit-profile" Component={EditProfile} />
          <Route path="/change-password" Component={ChangePassword} />
          <Route path="/add-class" Component={AddClass} />
          <Route path="/class/detail/:id" Component={DetailClass} />
          <Route path="/create-posting" Component={CreatePosting} />
          <Route path="/comment/:id" Component={Comment} />
          <Route path="/edit-posting/:id" Component={EditPosting} />
          <Route path="/enroll/:id" Component={EnrollClass} />
          <Route path="/add-book" Component={AddBook} />
          <Route path="/manage-book/:id" Component={ManageBook} />
          <Route path="/read-book/:id" Component={ReadBook} />
          <Route path="/assesment/:id" Component={Assesment} />
          <Route path="/summary_book/:id" Component={SummaryBook} />
          <Route path="/answer/:id" Component={Answer} />
          <Route path="/manage_class/:id" Component={ManageClass} />
          <Route path="/class/:id" Component={SeeClass} />
          <Route path="/edit_class/:id" Component={EditClass} />
          <Route path="/edit_class_photo/:id" Component={EditPhotoClass} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
