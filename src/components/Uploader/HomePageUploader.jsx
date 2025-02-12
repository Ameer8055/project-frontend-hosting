import React, { useEffect, useState } from "react";
import NavbarUploader from "../navbars/NavbarUploader";
import axiosInstance from "../../axiosInterceptor";
import { useNavigate } from "react-router-dom";

const HomePageUploader = () => {
  const user = JSON.parse(sessionStorage.getItem("user")); // Retrieve user data from sessionStorage
  const [videos, setVideos] = useState([]);
  const uploaderId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchvideo = async () => {
      try {
        const response = await axiosInstance(
          `http://localhost:3000/Creator/uploader/${uploaderId}/videos`
        );
        const videos = response.data;
        setVideos(videos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchvideo();
  }, []);

  const handleDelete = async (videoId) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/Creator/video/${videoId}`);
      setVideos(videos.filter(video => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleUpdate = (videoId) => {
    navigate(`/editvideo`,{state:{videoId : videoId}});
  };
 useEffect(() => {
      const handlePopState = () => {
        navigate("/login");
        sessionStorage.clear();
       
      };
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, []);
  return (
    <>
      <NavbarUploader />
      {user && (
        <div className="user-details text-center">
          <h5 className="fs-4 text-center text-white mt-3">
            Welcome, {user.name}!
          </h5>
          <h5 className="fs-4 text-center text-white mt-3">Your videos</h5>
          <div className="p-6 max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-gray-800 rounded-lg shadow-lg"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{video.director}</p>
                    <p className="text-sm text-blue-400">{video.year}</p>
                    <p className="text-yellow-500 mt-2">
                      {video.price === "free" ? "Free" : "Paid"}
                    </p>
                    <a
                      href={`/watch/uploader/${video._id}`}
                      className="mt-4 inline-block bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 me-1"
                    >
                      Watch
                    </a>
                    <button
                      onClick={() => handleUpdate(video._id)}
                      className="mt-4 inline-block bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600 me-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="mt-4 inline-block bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 me-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePageUploader;
