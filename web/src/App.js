import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import Home from "./components/home";
import DriverHome from "./components/driverhome";
import { GlobalContext } from "./context/context";
import axios from "axios";

function App() {
  const { state, dispatch } = useContext(GlobalContext);
  const [login, setLogin] = useState(null);

  const loginHandler = async () => {
    try {
      const res = await axios.get("http://localhost:2344/api/auth/Token", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch({
        type: "USER_LOGIN",
        payload: res.data.user,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "USER_LOGOUT",
      });
    }
  };

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);
  useEffect(() => {
    loginHandler();
    
  }, []);

  return (
    <div className={``}>
     
      {state.isLogin === true && state.role === "driver" ? (
        <>
          
          <Routes>
            <Route exact path="/" element={<DriverHome />} />
           
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {state.isLogin === true  && state.role === "passenger" ? (
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
        
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
      {state.isLogin === false ? (
        <>
          <Routes>
            <Route exact path="/login" element={<LoginPage theme={state.darkTheme} />} />
            <Route exact path="/register" element={<RegisterPage theme={state.darkTheme} />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </>
      ) : null}
    </div>
  ); 
}

export default App;