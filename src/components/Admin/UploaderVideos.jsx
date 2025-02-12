import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";
import { Card, CardContent, Typography, Button } from "@mui/material";

const UploaderVideos = () => {
  const { uploaderId } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axiosInstance.get(
        `http://localhost:3000/Creator/uploader/${uploaderId}/videos`
      );
      setVideos(response.data);
    };
    fetchVideos();
  }, [uploaderId]);

  const handleDelete = async (videoId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/Creator/video/${videoId}`
      );
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex ms-3 mt-2'>
        <img src="/Images/video-editing-app.png" alt="" style={{width:'50px'}} className='mt-2 me-3' />
      <Typography variant="h6" sx={{ flexGrow: 1 }} className="mt-3 text-white">
              CINESTREAM
            </Typography>
        </div>
        <Link to={"/uploaderdetails"}>
        <p className="text-end me-4 fs-5 mt-4">GO BACK</p>
      </Link>
      </div>
     
      <h1 className="text-center text-white fs-3 mt-5">Uploaded Videos</h1>
      <div className="container mt-5 d-flex flex-wrap justify-content-center align-items-stretch">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              className="my-4 griditem bg-gray-800 rounded-lg shadow-lg"
              key={video._id}
            >
              <Link to={`/admin/watch/${video._id}`}>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="thumbnail-image w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    {video.title}
                  </h3>
                </div>
              </Link>
              <Button
              className="hover:bg-red-700 text-white font-bold py-2 d-flex mx-auto"
                onClick={() => handleDelete(video._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploaderVideos;
