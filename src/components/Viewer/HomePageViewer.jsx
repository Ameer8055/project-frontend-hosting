import React, { useEffect, useState } from "react";
import NavbarViewer from "../navbars/NavbarViewer";
import axiosInstance from "../../axiosInterceptor";
import "../../assets/css/homepageviewer.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root"); // Adjust this based on your app's root element

const HomePageViewer = () => {
  const [videos, setVideos] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user._id;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get(
          searchQuery
            ? `https://project-backend-hosting.onrender.com/Viewer/videos/name/${searchQuery}`
            : selectedGenre
            ? `https://project-backend-hosting.onrender.com/Viewer/videos/${selectedGenre}`
            : "https://project-backend-hosting.onrender.com/Video/videos"
        );
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("No videos Found");
      }
    };

    fetchVideos();
  }, [selectedGenre, searchQuery]);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/login");
      sessionStorage.clear();
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const fetchContinueWatching = async () => {
      try {
        const response = await axiosInstance.get(
          `https://project-backend-hosting.onrender.com/Playlist/continue-watching/${userId}`
        );
        setContinueWatching(response.data);
      } catch (err) {
        console.error("Error fetching continue watching data:", err);
        setError(
          "Failed to load continue watching movies. Please try again later."
        );
      }
    };

    if (user) {
      fetchContinueWatching();
    }
  }, [user]);

  const handleRemoveFromContinueWatching = async (videoId) => {
    try {
      await axiosInstance.delete(
        `https://project-backend-hosting.onrender.com/Playlist/continue-watching/${videoId}`
      );
      setContinueWatching(
        continueWatching.filter((entry) => entry.video !== videoId)
      );
    } catch (err) {
      console.error("Error removing video from continue watching:", err);
      setError("Failed to remove video. Please try again later.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleVideoClick = (video) => {
    const subscriptionStatus = user.subscription; 
    if (video.price == "paid" && subscriptionStatus === "free") {
      setModalIsOpen(true); // Show the modal instead of alert
    } else {
      navigate(`/watch/${video._id}`); // Navigate to the video page if conditions are met
    }
  };

  return (
    <div>
      <NavbarViewer onGenreChange={setSelectedGenre} onSearch={handleSearch} />
      <div className="viewerpage p-6 max-w-7xl mx-auto mt-8">
        {continueWatching.length > 0 && (
          <div className="continue-watching-section p-6 max-w-7xl mx-auto mt-8">
            <h6 className="text-2xl font-bold text-white">Continue Watching</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {continueWatching.map((entry) => (
                <div
                  className="griditem bg-transparent rounded-lg shadow-lg"
                  key={entry._id}
                >
                  <Link to={`/watch/${entry.video}?time=${entry.progress}`}>
                    <img
                      src={`${entry.thumbnailUrl}`}
                      alt={`Video ${entry.video}`}
                      className="thumbnail-image w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-white">
                      {entry.title}
                    </h3>
                    <Button
                      className="button-remove text-white"
                      onClick={() =>
                        handleRemoveFromContinueWatching(entry._id)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {videos.length === 0 ? (
          <p className="text-center text-white">
            No movies found for your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {videos.map((video) => (
              <div
                className="griditem shadow-lg"
                key={video._id}
                onClick={() => handleVideoClick(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="thumbnail-image w-full h-60 object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal JSX */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className=" text-center"
      >
        <h3 className="text-black fs-2" style={{ marginTop: "250px" }}>
          You should be a subscriber to access the movie
        </h3>
        <button onClick={closeModal} className="text-danger">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default HomePageViewer;
