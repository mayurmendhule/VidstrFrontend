import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../firebase";

const Registration = () => {
  const [form, setform] = useState({
    userPic: "",
    userName: "",
    userEmail: "",
    userPhoneNo: "",
    userProfession: "",
    userPassword: "",
    userCPassword: "",
  });
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isfetching, setIsfetching] = useState(false);
  // const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const Handler = async (formData) => {
    if (
      form.userName === "" ||
      form.userEmail === "" ||
      form.userPhoneNo === "" ||
      form.userProfession === "" ||
      form.userPassword === ""
    ) {
      setError(true);
      setErrorMsg("Please fill all the field");
    } else if (formData.userPassword !== formData.userCPassword) {
      setError(true);
      setErrorMsg("Password and Confirm Password should be same");
    } else {
      setIsfetching(true);

      try {
        setIsfetching(true);
        //     const fileName = new Date().getTime() + file.name;
        // const storage = getStorage(app);
        // const storageRef = ref(storage, fileName);
        // const uploadTask = uploadBytesResumable(storageRef, file);
        const res = await axios.post(
          "https://backendvidstr.onrender.com/api/users/register",
          {
            username: form.userName,
            email: form.userEmail,
            phone: form.userPhoneNo,
            profession: form.userProfession,
            password: form.userPassword,
            photoUrl: form.userPic,
          }
        );
        res.data && navigate("/login");
        setIsfetching(false);
      } catch (err) {
        setError(true);
        setErrorMsg("Email is already present");
        setIsfetching(false);
      }
    }
  };

  // console.log(file);

  return (
    <div className="container">
      <div className="div1">
        <div className="title">
          <p className="p1">Tuner</p>
          <p className="p2">Enjoy Multiple videos</p>
          <p className="p3">at one place</p>
          <Link
            to="/login"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="div2">
        <div className="regis">
          <h1>Register</h1>
          <p>Register to continue access pages</p>
          {/* <div className="profilepic">
            {file && <img src={URL.createObjectURL(file)} alt="" />}
            <input
              type="file"
              placeholder="+"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div> */}
          <div className="inp">
            <input
              placeholder="Name..."
              type="text"
              onChange={(e) => {
                setform({ ...form, userName: e.target.value });
              }}
            />
          </div>
          <div className="inp">
            <input
              className="R-Email"
              placeholder="Email..."
              type="email"
              onChange={(e) => {
                setform({ ...form, userEmail: e.target.value });
              }}
            />
          </div>
          <div className="inp">
            <input
              className="R-Phone"
              placeholder="Phone..."
              type="text"
              onChange={(e) => {
                setform({ ...form, userPhoneNo: e.target.value });
              }}
            />
          </div>
          <div className="inp">
            <input
              className="R-Profession"
              placeholder="Profession..."
              type="text"
              onChange={(e) => {
                setform({ ...form, userProfession: e.target.value });
              }}
            />
          </div>
          <div className="inp">
            <input
              className="R-Password"
              placeholder="Password..."
              type="password"
              onChange={(e) => {
                setform({ ...form, userPassword: e.target.value });
              }}
            />
          </div>
          <div className="inp">
            <input
              className="R-ConfirmP"
              placeholder="Confirm password..."
              type="password"
              onChange={(e) => {
                setform({ ...form, userCPassword: e.target.value });
              }}
            />
          </div>
          <button
            className="btnR"
            onClick={() => Handler(form)}
            disabled={isfetching}
          >
            Register
          </button>
          {error && <div style={{ color: "red" }}>{errorMsg}</div>}
        </div>
      </div>
    </div>
  );
};
export default Registration;
