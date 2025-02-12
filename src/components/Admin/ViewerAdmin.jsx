import React, { useState, useEffect} from "react";
import NavbarAdmin from "../navbars/NavbarAdmin";
import axiosInstance from "../../axiosInterceptor";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../../assets/css/ViewerAdmin.css";
import { useNavigate } from "react-router-dom";

const ViewerAdmin = () => {
  const [viewers, setViewers] = useState([]);

  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchViewers = async () => {
      const response = await axiosInstance.get(
        "https://project-backend-hosting.vercel.app/Viewer/viewers"
      );
      setViewers(response.data);
    };
    fetchViewers();
  }, []);

  const handleBlockViewer = async (id) => {
    try {
      await axiosInstance.put(`https://project-backend-hosting.vercel.app/Admin/user/${id}/block`);
      setViewers(
        viewers.map((Viewer) =>
          Viewer._id === id
            ? { ...Viewer, blocked: Viewer.blocked === "yes" ? "no" : "yes" }
            : Viewer
        )
      );
    } catch (error) {
      console.error("Error blocking Viewer:", error);
    }
  };

  const handleDeleteViewer = async (id) => {
    try {
      await axiosInstance.delete(`https://project-backend-hosting.vercel.app/Admin/user/${id}`);
      setViewers(viewers.filter(viewer => viewer._id !== id));
    } catch (error) {
      console.error("Error deleting viewer:", error);
    }
  };



  return (
    <>
      <NavbarAdmin />
      <h1 className="text-white text-center fs-1 mt-5">List of Viewers</h1>
      <div className="container mt-5">
        <div className="row">
          {viewers.map((Viewer) => (
            <div className="col-md-6 mb-4" key={Viewer._id}>
              <Card className="viewer-card">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {Viewer.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Email: {Viewer.email}
                  </Typography>
                  <Typography color="text.secondary">
                    Subscription: {Viewer.subscription}
                  </Typography>
                  <Typography color="text.secondary">
                    Created At: {Viewer.createdAt}
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  className="btn btn-danger"
                  onClick={() => handleBlockViewer(Viewer._id)}
                >
                  {Viewer.blocked === "yes" ? "Unblock" : "Block"}
                </Button>
                <Button size="small" className="btn btn-danger" onClick={() => handleDeleteViewer(Viewer._id)}>
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewerAdmin;
