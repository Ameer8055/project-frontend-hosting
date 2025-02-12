import React, { useState, useEffect } from "react";
import NavbarAdmin from "../navbars/NavbarAdmin";
import axiosInstance from "../../axiosInterceptor";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../assets/css/UploaderAdmin.css";

const UploadersAdmin = () => {
  const [uploaders, setUploaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploader = async () => {
      const response = await axiosInstance.get(
        "https://project-backend-hosting.vercel.app/Creator/uploaders"
      );
      setUploaders(response.data);
    };
    fetchUploader();
  }, []);

  const handleBlockUploader = async (id) => {
    try {
      await axiosInstance.put(`https://project-backend-hosting.vercel.app/Admin/user/${id}/block`);
      setUploaders(
        uploaders.map((uploader) =>
          uploader._id === id
            ? {
                ...uploader,
                blocked: uploader.blocked === "yes" ? "no" : "yes",
              }
            : uploader
        )
      );
    } catch (error) {
      console.error("Error blocking uploader:", error);
    }
  };

  const handleDeleteUploader = async (id) => {
    try {
      await axiosInstance.delete(`https://project-backend-hosting.vercel.app/Admin/user/${id}`);
      setUploaders(uploaders.filter((uploader) => uploader._id !== id));
    } catch (error) {
      console.error("Error deleting viewer:", error);
    }
  };

  const handleViewVideos = (id) => {
    navigate(`/admin/uploader/${id}/videos`);
  };

  return (
    <>
      <NavbarAdmin />
      <h1 className="text-white text-center fs-1 mt-5">List of Uploaders</h1>
      <div className="container mt-5">
        <div className="row">
          {uploaders.map((uploader) => (
            <div className="col-md-6 mb-4" key={uploader._id}>
              <Card className="uploader-card">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {uploader.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Email: {uploader.email}
                  </Typography>
                  <Typography color="text.secondary">
                    Subscription: {uploader.subscription}
                  </Typography>
                  <Typography color="text.secondary">
                    Created At: {uploader.createdAt}
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  className="btn btn-danger"
                  onClick={() => handleBlockUploader(uploader._id)}
                >
                  {uploader.blocked === "yes" ? "Unblock" : "Block"}
                </Button>
                <Button
                  size="small"
                  className="btn btn-danger"
                  onClick={() => handleDeleteUploader(uploader._id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  className="btn btn-info"
                  onClick={() => handleViewVideos(uploader._id)}
                >
                  View Videos
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UploadersAdmin;
