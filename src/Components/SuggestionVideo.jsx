import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Smallvideo from "./Smallvideo";

const SuggestionVideo = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getRandomVideos = async () => {
      const res = await axios.get(
        "https://backendvidstr.onrender.com/api/videos/get-random"
      );
      setVideos(res.data.slice(1, 4));
    };
    getRandomVideos();
  }, []);

  return (
    <div className="suggestion-videos">
      {videos.map((video, index) => (
        <Link to="/play-video" state={{ movieData: video }}>
          <Smallvideo video={video} key={index} />
        </Link>
      ))}
    </div>
  );
};

export default SuggestionVideo;
