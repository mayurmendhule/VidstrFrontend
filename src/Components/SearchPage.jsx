import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./NavBar";
import Smallvideo from "./Smallvideo";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getSearchData = async () => {
      const res = await axios.get(
        `https://backendvidstr.onrender.com/api/videos/search?title=${searchQuery}`
      );
      setVideos(res.data);
    };
    getSearchData();
  }, [searchQuery]);

  // console.log(videos);
  return (
    <div className="search-page">
      <Nav setSearchQuery={setSearchQuery} />
      <div className="searched-video">
        {videos.map((video) => (
          <Link to="/play-video" state={{ movieData: video }}>

            <Smallvideo video={video} />
          </Link>
        ))}
        

      </div>
    </div>
  );
};

export default SearchPage;
