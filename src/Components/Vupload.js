import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";

const VideoUpload = ({ setOpenModal }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "",
    visibility: "",
    publisherId: currentUser._id,
    videoDuration: "",
  });

  const handleClose = () => {
    setOpenModal(false);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setFile(files[0]);
  };

  console.log(movieData);

  function handleClick(formData) {
    setIsUploading(true);
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          const postMovieData = async () => {
            try {
              const res = await axios.post(
                "https://backendvidstr.onrender.com/api/videos/upload",
                { ...movieData, videoUrl: downloadURL },
                {
                  headers: {
                    token: "Bearer " + currentUser.accessToken,
                  },
                }
              );
              setIsUploading(false);
              console.log(res);
            } catch (err) {
              console.log(err);
            }
          };
          postMovieData();
        });
      }
    );
  }

  return (
    <>
      <div className="V-container">
        <div className="V-container2">
          <div className="V-Title">
            <p>Upload New Video</p>
            <button onClick={handleClose}>X</button>
          </div>
          <div
            className="drag-drop"
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <img
              className="dd-image"
              src="https://icon-library.com/images/cloud-upload-icon/cloud-upload-icon-11.jpg"
              alt="pic"
            />
            <p>Drag and drop to upload</p>
            <input
              className="F-inp"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p id="p2">or Click here to browse a file</p>
            {file && <div style={{ color: "white" }}>{file.name}</div>}
          </div>

          <div className="abc">
            <p>Name</p>
            <input
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
            />
            <p>Description</p>
            <textarea
              placeholder="Description"
              onChange={(e) =>
                setMovieData({ ...movieData, description: e.target.value })
              }
            />
            <input
              placeholder="video duration(in Mins)"
              type="text"
              onChange={(e) =>
                setMovieData({ ...movieData, videoDuration: e.target.value })
              }
            />
          </div>

          <div className="category">
            <div>
              <p htmlFor="vid">Category</p>
              <select
                name="vid"
                id="drop"
                onChange={(e) =>
                  setMovieData({ ...movieData, category: e.target.value })
                }
              >
                <option disabled selected>
                  Category
                </option>
                <option value="long">Long</option>
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
            <div>
              <p htmlFor="vis">Visibility</p>
              <select
                name="vis"
                id="drop"
                onChange={(e) =>
                  setMovieData({ ...movieData, visibility: e.target.value })
                }
              >
                <option disabled selected>
                  Visibility
                </option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <p htmlFor="others1">Others</p>
              <select name="others1" id="drop">
                <option disabled selected>
                  Others
                </option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <p htmlFor="others2">Others2</p>
              <select name="others2" id="drop">
                <option disabled selected>
                  Others2
                </option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          <button className="Save" onClick={handleClick} disabled={isUploading}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default VideoUpload;

