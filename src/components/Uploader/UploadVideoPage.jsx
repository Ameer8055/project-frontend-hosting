import React, { useState } from "react";
import NavbarUploader from "../navbars/NavbarUploader";
import axiosInstance from "../../axiosInterceptor";
import { useNavigate } from "react-router-dom";

// Spinner component for uploading animation
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
  </div>
);

const UploadVideoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); //uploding
  const [uploadComplete, setUploadComplete] = useState(false); //uploading complete

  const navigate = useNavigate();

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Starting animation
    setUploadComplete(false); // Reset upload complete

    const user = JSON.parse(sessionStorage.getItem("user"));
    const uploaderId = user._id;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);
    formData.append("price", price);
    formData.append("director", director);
    formData.append("releaseYear", releaseYear);
    formData.append("uploaderId", uploaderId);

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/Video/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadComplete(true);
      navigate("/uploaderhome");
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrorMessage(
        "Failed to upload video. Please check the required fields and try again."
      ); // Set error message
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <NavbarUploader />
      <div className="p-6 ms-3 me-3 max-w-lg mx-auto bg-dark mt-4 rounded-3 ">
        <h4 className="text-xl font-semibold mb-4 mt-3 text-white fs-2 text-center">
          Upload Movie Details
        </h4>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleVideoUpload}>
          <div className="column1 d-flex flex-column">
            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="title"
              >
                Video Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border rounded-md"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border rounded-md"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
                style={{ height: "150px" }} // Increased height
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="genre"
              >
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                className="w-full p-2 border rounded-md"
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
                required
              >
                <option value="">SELECT A GENRE</option>
                <option value="action">Action</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
                <option value="horror">Horror</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Sci-fi">Sci-fi</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="director"
              >
                Director
              </label>
              <input
                type="text"
                id="director"
                name="director"
                className="w-full p-2 border rounded-md"
                placeholder="Enter director's name"
                value={director}
                onChange={(e) => {
                  setDirector(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
                htmlFor="releaseYear"
              >
                Year of Release
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                className="w-full p-2 border rounded-md"
                placeholder="Enter year of release"
                value={releaseYear}
                onChange={(e) => {
                  setReleaseYear(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1 text-white"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full p-2 border rounded-md bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1 text-white"
              htmlFor="video"
            >
              Video
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              name="video"
              className="w-full p-2 border rounded-md bg-white"
              onChange={(e) => setVideo(e.target.files[0])}
              placeholder="Upload video"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Is the video paid or free?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="isPaid"
                  value="free"
                  className="mr-2"
                  onClick={(e) => setPrice(e.target.value)}
                />
                Free
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="isPaid"
                  value="paid"
                  className="mr-2"
                  onClick={(e) => setPrice(e.target.value)}
                />
                Paid
              </label>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleVideoUpload}
          >
            Upload
          </button>
          {isUploading && <Spinner />}
          {isUploading && (
            <p className="text-white text-center">Please Wait...</p>
          )}
        </form>
      </div>
    </>
  );
};

export default UploadVideoPage;
