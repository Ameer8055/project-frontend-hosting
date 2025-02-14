import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInterceptor";
import VideodisplayNavbar from "../navbars/VideodisplayNavbar";
import VideodisplayNavbarUploader from "../navbars/VideodisplayNavbarUploader";
import CommentForUploader from "../Uploader/CommentForUploader";

const WatchVideoUploader = () => {
  const { id } = useParams(); // Get video ID from URL
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

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

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!video) {
    return <p className="text-center">Loading video...</p>;
  }

  return (
    <>
      <VideodisplayNavbarUploader />
      <div className="p-6 max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          {video.title}
        </h1>
        <video
          controls
          src={video.videoUrl}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <p className="text-success bg-dark p-2 rounded-2 mt-4">{video.description}</p>
        <p className="text-blue-400 mt-2 text-uppercase">{video.genre}</p>
        <CommentForUploader />
      </div>
    </>
  );
};

export default WatchVideoUploader;
