import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import CommentForUploader from "../Uploader/CommentForUploader";
import { Typography } from "@mui/material";

const AdminWatchVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axiosInstance.get(
        `https://project-backend-hosting.onrender.com/Video/videos/${id}`
      );
      setVideo(response.data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div className="text-white text-center">Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex ms-3 mt-2">
          <img
            src="/Images/video-editing-app.png"
            alt=""
            style={{ width: "50px" }}
            className="mt-2 me-3"
          />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            className="mt-3 text-white"
          >
            CINESTREAM
          </Typography>
        </div>
        <Link to={`/admin/uploader/${video.uploader}/videos`}>
          <p className="text-white text-end me-3 mt-4">GO BACK</p>
        </Link>
      </div>

      <div className="p-6 max-w-5xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          {video.title}
        </h1>
        <video
          controls
          src={video.videoUrl}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <p className="text-gray-400 mt-4">{video.description}</p>
        <p className="text-blue-400 mt-2 text-uppercase">{video.genre}</p>
        <p className="text-yellow-500 mt-2">
          {video.price === "free" ? "Free" : "Paid"}
        </p>
        <CommentForUploader />
      </div>
    </div>
  );
};

export default AdminWatchVideo;
