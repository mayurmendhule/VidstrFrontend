import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/apiCalls";
import VideoUpload from "./Vupload";

function Nav({ setSearchQuery }) {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    Logout(dispatch);
    window.location.replace("/");
  };

  // console.log(user);
  return (
    <div className="navigation-bar">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <span className="logo">Tuner</span>
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {currentUser ? (
        <div className="user-links">
          <Link
            to="/my-video"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p style={{ cursor: "pointer" }}>My Videos</p>
          </Link>
          <span>|</span>
          <p style={{ cursor: "pointer" }} onClick={() => setOpenModal(true)}>
            Upload
          </p>
          <span>|</span>
          <p style={{ cursor: "pointer", color:"red"}} onClick={() => handleLogout()}>
            Sign out
          </p>
        </div>
      ) : (
        <div className="user-links">
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <p style={{ cursor: "pointer" }}>Login</p>
          </Link>
          <span>|</span>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p style={{ cursor: "pointer" }}>Register</p>
          </Link>
        </div>
      )}
      {openModal && (
        <VideoUpload setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </div>
  );
}

export default Nav;
