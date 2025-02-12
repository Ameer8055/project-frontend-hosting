import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import NavbarUser from "./components/navbars/NavbarUser";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewerAdmin from "./components/Admin/ViewerAdmin";
import HomePageUploader from "./components/Uploader/HomePageUploader";
import HomePageViewer from "./components/Viewer/HomePageViewer";
import NavbarAdmin from "./components/navbars/NavbarAdmin";
import NavbarUploader from "./components/navbars/NavbarUploader";
import UploadersAdmin from "./components/Admin/UploadersAdmin";
import Privateroutes from "./components/PrivateRoutes";
import UploadVideoPage from "./components/Uploader/UploadVideoPage";
import Watchvideo from "./components/videosPage/Watchvideo";
import VideodisplayNavbar from "./components/navbars/VideodisplayNavbar";
import WatchVideoUploader from "./components/videosPage/WatchVideoUploader";
import EditvideoPage from "./components/Uploader/EditvideoPage";
import ViewerPayment from "./components/Viewer/ViewerPayment";
import AdminWatchVideo from "./components/Admin/Adminwatchvideo";
import UploaderVideos from "./components/Admin/UploaderVideos";
import CommentSection from "./components/Viewer/CommentSection";
import CommentForUploader from "./components/Uploader/CommentForUploader";
import Carousel from "./components/Viewer/Carousel";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Carousel />} />
        <Route element={<Footer />} />
        <Route element={<Privateroutes />}>
          <Route path="/navbaruser" element={<NavbarUser />} />
          <Route path="/navbaradmin" element={<NavbarAdmin />} />
          <Route path="/navbaruploader" element={<NavbarUploader />} />
          <Route path="/navbarvideoplay" element={<VideodisplayNavbar />} />
          <Route path="/uploaderhome" element={<HomePageUploader />} />
          <Route path="/viewerhome" element={<HomePageViewer />} />
          <Route path="/viewerDetails" element={<ViewerAdmin />} />
          <Route path="/uploaderDetails" element={<UploadersAdmin />} />
          <Route path="/uploadervideo" element={<UploadVideoPage />} />
          <Route path="/editvideo" element={<EditvideoPage />} />
          <Route path="/watch/:id" element={<Watchvideo />} />
          <Route path="/watch/uploader/:id" element={<WatchVideoUploader />} />
          <Route
            path="/admin/uploader/:uploaderId/videos"
            element={<UploaderVideos />}
          />
          <Route path="/admin/watch/:id" element={<AdminWatchVideo />} />
          <Route path="/viewerpayment" element={<ViewerPayment />} />
          <Route element={<CommentSection />} />
          <Route element={<CommentForUploader />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
