 import React from "react";
import Nav from "./NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FetchVideo from "./VideoFetch";
import Smallvideo from "./Smallvideo";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const GetData = async () => {
      const url = `https://backendvidstr.onrender.com/api/videos/get-random`;

      const res = await axios.get(url);
      setVideos(res.data);

      if (res.data) {
        const getUser = await axios.get(
          `https://backendvidstr.onrender.com/api/users/get-User/${res.data[0].publisherId}`
        );
        setUserName(getUser.data.username);
      }
    };

    const getSearchData = async () => {
      const res = await axios.get(
        `https://backendvidstr.onrender.com/api/videos/search?title=${searchQuery}`
      );
      setSearchedVideos(res.data);
    };
    if (searchQuery !== "") {
      getSearchData();
    }

    GetData();
  }, [currentUser, searchQuery]);

  console.log(searchQuery);
  return (
    <div>
      <Nav setSearchQuery={setSearchQuery} />
      {searchQuery === "" ? (
        <div>
          <div className="Image">
            <video src={videos[0]?.videoUrl} type="video/mp4" />
            <h2 className="video-title">{videos[0]?.title}</h2>
            <div className="video-data">
              <p>14 March 2023</p>
              <p>1 Mins</p>
              <p>200 Views</p>
            </div>
            <div className="publisher">
              <img
                className="publisher-img"
                src="https://img.freepik.com/premium-psd/psd-3d-male-cartoon-character-avatar-isolated-3d-rendering_460336-1517.jpg?w=740"
                alt=""
              />
              <p>{userName}</p>
            </div>
          </div>
          <FetchVideo />
        </div>
      ) : (
        <div className="search-page">
          <div className="searched-video">
            {searchedVideos.map((video) => (
              <Link to="/play-video" state={{ movieData: video }}>
                <Smallvideo video={video} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
