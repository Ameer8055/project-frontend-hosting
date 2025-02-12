import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import NavbarUploader from "../navbars/NavbarUploader";
import axiosInstance from "../../axiosInterceptor";
import axios from "axios";

// Spinner component for loading animation
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
  </div>
);

const EditvideoPage = () => {
  const location = useLocation();
  const { videoId } = location.state; // Access video ID from state

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/Video/videos/${videoId}`
        );
        const video = response.data;
        setTitle(video.title);
        setDescription(video.description);
        setGenre(video.genre);
        setDirector(video.director);
        setReleaseYear(video.year);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setErrorMessage("Failed to fetch video details.");
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // updating state
  const [updateComplete, setUpdateComplete] = useState(false); // update complete
  const [thumbnail, setThumbnail] = useState(null);

  const navigate = useNavigate();

  const handleVideoUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateComplete(false);
  
    let imageUrl = null;
  
    // If a new image is selected, upload it to Cloudinary
    if (thumbnail) {
      const formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset
  
      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dm7vs9vln/image/upload",
          formData
        );
        imageUrl = uploadResponse.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrorMessage("Failed to upload image. Please try again.");
        setIsUpdating(false);
        return;
      }
    }
  
    // Prepare the updated video data
    const updatedData = {
      title,
      description,
      genre,
      director,
      releaseYear,
      price,
      ...(imageUrl && { thumbnailUrl: imageUrl }) // Only add thumbnail if a new image was uploaded
    };
  
    try {
      await axiosInstance.patch(
        `http://localhost:3000/Creator/update/${videoId}`,
        updatedData
      );
      setUpdateComplete(true);
      navigate("/uploaderhome");
    } catch (error) {
      console.error("Error updating video:", error);
      setErrorMessage("Failed to update video.");
    } finally {
      setIsUpdating(false);
    }
  };
  

  return (
    <>
      <NavbarUploader />
      <div className="p-6 max-w-lg mx-auto bg-dark mt-4 rounded-3">
        <h4 className="text-xl font-semibold mb-4 mt-3 text-white fs-2 text-center">
          Edit Movie Details
        </h4>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleVideoUpdate}>
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
                <option value="feelGood">Feel-Good</option>
                <option value="romance">Romance</option>
                <option value="crime">Crime</option>
                <option value="horror">Horror</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Sci-fi">Sci-fi</option>
                <option value="Other">Other</option>
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
              <label className="block text-sm font-medium mb-1 text-white">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-md bg-white"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
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
            onClick={handleVideoUpdate}
          >
            Update
          </button>
          {isUpdating && <Spinner />}
          {isUpdating && (
            <p className="text-white text-center">Please Wait...</p>
          )}
        </form>
      </div>
    </>
  );
};

export default EditvideoPage;
