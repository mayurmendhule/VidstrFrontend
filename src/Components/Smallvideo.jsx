import React from "react";

const Smallvideo = ({ video }) => {
  //   console.log(video);
  return (
    <div key={video._id} className="F-img">
      <div className="videoDiv">
        <video
          className="F-images"
          key={video._id}
          src={video.videoUrl}
          alt={video.title}
        />

        <div className="small-video-information">
          <div>
            <div className="small-video-title">{video.title}</div>
            <div className="small-video-data">
              <p>14 Jan, 2023</p>
              <p>1 Mins</p>
              <p>200 Views</p>
            </div>
          </div>
          <div className="small-video-publisher-img">
            <img
              src="https://img.freepik.com/premium-psd/psd-3d-male-cartoon-character-avatar-isolated-3d-rendering_460336-1517.jpg?w=740"
              alt=""
            />
          </div>
          <div className="small-video-pause-btn">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smallvideo;
