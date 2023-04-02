import React from "react";
import { useLocation } from "react-router";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import SuggestionVideo from "./SuggestionVideo";
import { Link } from "react-router-dom";
// import Nav from "./NavBar";

const VideoPlay = () => {
  const location = useLocation();

  let movie = location.state?.movieData;

  return (
    <div className="play-video">
      {/* <Nav /> */}
    <Link to="/search"> <button className="backbtn">Back</button></Link>  
      <div className="videos">
        <div className="main-video">
          <Video
            autoPlay
            className="video-player"
            src={movie.videoUrl}
            type="video/mp4"
          />

          <div className="main-video-data">
            <div className="main-video-publisher">
              <img
                className="main-video-publisher-img"
                src="https://img.freepik.com/premium-psd/psd-3d-male-cartoon-character-avatar-isolated-3d-rendering_460336-1517.jpg?w=740"
                alt=""
              />
              <div className="main-video-title">
                <h2>{movie.title}</h2>
              </div>
            </div>

            <div className="main-video-data">
              <p>14 March 2023</p>
              <p>{movie.videoDuration} Mins</p>
              <p>200 Views</p>
            </div>
          </div>
        </div>
        <SuggestionVideo />
      </div>
    </div>
  );
};

export default VideoPlay;
