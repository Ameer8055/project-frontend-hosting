import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import VideodisplayNavbar from "../navbars/VideodisplayNavbar";
import CommentSection from "../Viewer/CommentSection";

const Watchvideo = () => {
  const { id } = useParams(); // Get video ID from URL
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user")); // Replace with actual user ID logic
  const userId = user._id;
  const videoRef = useRef(null);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const time = queryParams.get("time");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(
          `https://project-backend-hosting.onrender.com/Video/videos/${id}`
        );
        setVideo(response.data);
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to load video. Please try again later.");
      }
    };

    fetchVideo();
  }, [id]);

  const handleProgress = async () => {
    const currentTime = videoRef.current.currentTime; // Get current playback time
    try {
      await axiosInstance.post(
        "https://project-backend-hosting.onrender.com/Playlist/continue-watching",
        {
          title: video.title,
          thumbnailUrl: video.thumbnailUrl,
          user: userId,
          video: id,
          progress: currentTime,
        }
      );
    } catch (error) {
      console.error("Error sending progress:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current && time) {
      videoRef.current.currentTime = parseFloat(time);
    }
  }, [video, time]);

  const handlePause = () => {
    handleProgress(); // Call handleProgress when the video is paused
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!video) {
    return <p className="text-center fs-2">Loading video...</p>;
  }

  return (
    <>
      <VideodisplayNavbar />
      <div>
        <div className="p-6 max-w-5xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-white">
            {video.title}
          </h1>
          <video
            ref={videoRef}
            controls
            src={video.videoUrl}
            className="w-full h-auto rounded-lg shadow-lg"
            onPause={handlePause}
            onDragEndCapture={handlePause}
          />
          <p className="text-gray-400 mt-4">{video.description}</p>
          <p className="text-blue-400 mt-2 text-uppercase">{video.genre}</p>
        </div>
        <div className="p-3 max-w-6xl mx-auto">
          <CommentSection />
        </div>
      </div>
    </>
  );
};

export default Watchvideo;
