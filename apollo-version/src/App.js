import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import SingleCar from "./pages/SingleCar";
import SingleBookingPage from "./pages/SingleBookingPage";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import "./App.css";
//images
import image1 from "./assets/bg_1.jpg";
import image2 from "./assets/bg_5.jpeg";
import image3 from "./assets/bg_6.jpeg";
import image4 from "./assets/bg_7.jpeg";

import { FaRoute, FaRegHandshake, FaMoneyBill } from "react-icons/fa";

//actions

// import { signIn } from "./features/actions/auth";

function App() {
  const [values, setValues] = useState({
    token: null,
    userId: null,
    email: null,
    role: null,
    company: null,
  });

  const [state, setState] = useState({ img: 0 });

  const token = "";

  useEffect(() => {
    checkSignIn();
  }, []);

  const checkSignIn = () => {
    if (localStorage.getItem("jwtToken")) {
      let tokenGot = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(tokenGot);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
      } else {
        setValues({
          token: tokenGot,
          email: decodedToken.email,
          isAdmin: decodedToken.isAdmin,
        });
      }
    }
  };

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setValues({
      token: token,
      email: decodedToken.email,
      isAdmin: decodedToken.isAdmin,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setValues({ token: null, userId: null, isAdmin: null, email: null });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: values.token,
            isAdmin: values.isAdmin,
            email: values.email,
            login: login,
            logout: logout,
          }}
        >
          <MainNavigation />
          <div>
            <Switch>
              {/* {values.token && <Redirect from="/" to="/cars" exact />} */}
              {values.token && <Redirect from="/auth" to="/cars" exact />}
              {/* {!values.token && (
                <Route path="/auth" component={AuthPage} exact />
              )} */}
              <Route path="/" component={Home} exact />
              <Route path="/auth" component={AuthPage} exact />
              <Route path="/cars" component={EventPage} exact />
              <Route path="/about" component={About} exact />
              <Route path="/contact" component={Contact} exact />
              {!values.token && <Redirect from="/bookings" to="/auth" exact />}
              {values.token && (
                <Route path="/bookings" component={BookingPage} exact />
              )}
              <Route path="/car/:id" component={SingleCar} exact />

              {values?.token && (
                <Route
                  path="/bookings/:id"
                  component={SingleBookingPage}
                  exact
                />
              )}
            </Switch>
          </div>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
