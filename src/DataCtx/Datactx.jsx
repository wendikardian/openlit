// Create a new use Context to get Id
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiUrl } from "../../data";
export const DataCtx = createContext();
// Create conte

const DataProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const email = Cookies.get("email");
      axios
        .get(`${apiUrl}/profile/${email}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProfile();
  }, []);

  const context = { profile, setProfile, isLogin, setIsLogin };

  return <DataCtx.Provider value={context}>{props.children}</DataCtx.Provider>;
};

export default DataProvider;
