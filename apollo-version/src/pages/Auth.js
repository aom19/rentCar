import React, { Component, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";

import "./Auth.scss";
import image1 from "../assets/img1.jpeg";
import Section from "../components/Section/Section";
import { AUTH, CREATE_USER } from "../graphql/Mutations/user";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spiner/Spinner";
import { enable } from "express/lib/application";

const AuthPage = () => {
  const history = useHistory();
  const [auth, { error, loading, data }] = useMutation(AUTH);
  const [
    createUser,
    { error: errorCreate, loading: loadingSignUp, data: dataSignUp },
  ] = useMutation(CREATE_USER);

  const context = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  {
    console.log(context);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const phoneNumber = values.phoneNumber;
    const address = values.address;

    if (!isLogin) {
      createUser({
        variables: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
        },
        onCompleted: ({ createUser }) => {
          context.login(createUser.token);
          localStorage.setItem("jwtToken", createUser.token);
          history.push("/cars");
        },
      });
    } else {
      auth({
        variables: {
          email: email,
          password: password,
        },
        onCompleted: ({ auth }) => {
          localStorage.setItem("jwtToken", auth.token);
          // history.push("/cars");
          context.login(auth.token, auth.tokenExpiration);
        },
      });
    }
  };
  return (
    <div>
      <div>
        <Section
          image={image1}
          page={!isLogin ? "Sign Up" : "Sign In"}
          name={!isLogin ? "Sign Up" : "Sign In"}
        />
      </div>

      {/* <section
          class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
          style={{
            backgroundImage: `url(${image3})`,
            // backgroundSize: "cover",
            backgroundPosition: "center",
            // overflow: "hidden",
            zIndex: -999,
          }}
          data-stellar-background-ratio="0.5"
        >
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div class="col-md-9  pb-5">
                <p class="breadcrumbs">
                  <span>
                    Sign In <i class="ion-ios-arrow-forward"></i>
                  </span>
                </p>
                <h1 class="mb-3 bread"> Sign In</h1>
              </div>
            </div>
          </div>
        </section> */}
      {loading || loadingSignUp ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="log-form">
            <form className="col-md-12" onSubmit={handleSubmit}>
              <h2>{isLogin ? "Please  Sign In" : "Please Sign Up"}</h2>
              <hr className="divisor" />
              {isLogin ? (
                <>
                  <div className="form-control">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    {/* <label htmlFor="password"> Password </label> */}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-control">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    {/* <label htmlFor="password"> Password </label> */}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="text"
                      id="addresss"
                      name="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={handleModeChange}
                >
                  Switch to {isLogin ? "Signup" : "Login"}
                </button>
                <button
                  type="submit"
                  className="btn"
                  disabled={!values.email && !values.password ? "true" : ""}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default AuthPage;
