import React from "react";
import "../App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Login = () => {
  const [sform, setsform] = useState({
    s_userEmail: "",
    s_Password: "",
  });
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Handler = (formData) => {
    console.log(formData);
    login(dispatch, {
      email: formData.s_userEmail,
      password: formData.s_Password,
    });
  };
  return (
    <div className="container">
      <div className="div1">
        <div className="title">
          <p className="p1">Tuner</p>
          <p className="p2">Enjoy Multiple videos</p>
          <p className="p3">at one place</p>
          <Link
            to="/register"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </div>
      </div>
      <div className="div2">
        <div className="login-container1">
          <div className="login-container">
            <h1>Sign In</h1>
            <p>Sign in to continue access pages</p>
            <div className="S-inp">
              <input
                className="S-Email"
                placeholder="Email..."
                type="email"
                onChange={(e) => {
                  setsform({ ...sform, s_userEmail: e.target.value });
                }}
              />
            </div>
            <div className="S-inp">
              <input
                className="S-Password"
                placeholder="Password..."
                type="password"
                onChange={(e) => {
                  setsform({ ...sform, s_Password: e.target.value });
                }}
              />
            </div>

            <button
              className="btnS"
              onClick={() => Handler(sform)}
              disabled={isFetching}
            >
              SignIn
            </button>
            {error && <div style={{ color: "#FF1A1A" }}>Something went wrong</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
