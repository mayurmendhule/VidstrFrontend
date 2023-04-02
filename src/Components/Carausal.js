import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Smallvideo from "./Smallvideo";
const Vcarousel = () => {
  const [videos, setVideos] = useState([]);
  // const [lessVideos, setLessVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const GetData = async () => {
      const url = `https://backendvidstr.onrender.com/api/videos/all`;

      const res = await axios.get(url);
      setVideos(res.data.slice(0, 5));
    };

    GetData();
  }, [currentUser]);

  console.log(videos);

  return (
    <div className="view-less">
       
      {videos.map((video) => (
        <Link to="/play-video" state={{ movieData: video }}>
          <Smallvideo video={video} />
        </Link>
      ))}
      
    </div>
  );
};
export default Vcarousel;
