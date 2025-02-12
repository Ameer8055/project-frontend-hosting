import React from "react";
import "../assets/css/Home.css";
import NavbarUser from "./navbars/NavbarUser";
import { motion } from "framer-motion";
import Carousel from "./Viewer/Carousel";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="homepage">
      <NavbarUser />
      <div className="home-container">
        <motion.h2
          className="fs-3 font-bold text-blue-400 mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
        >
          Welcome to CineStream
        </motion.h2>
        <motion.p
          className="text-lg text-white mx-auto mt-4"
          initial={{ opacity: 0, y: -50, x: -10 }}
          animate={{ opacity: 1, y: 0, x: 2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Experience the best movies at your fingertips. Join us today!
        </motion.p>
        <div className="features">
          <div className="feature-item">
            <h3 className="text-xl font-semibold">Wide Selection</h3>
            <p>Choose from a vast library of movies</p>
          </div>
          <div className="feature-item">
            <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
            <p>Enjoy a seamless browsing experience.</p>
          </div>
          <div className="feature-item">
            <h3 className="text-xl font-semibold">Watch Anytime, Anywhere</h3>
            <p>Access your favorite content on any device.</p>
          </div>
        </div>
        <h4 className="fs-3 text-center text-white mt-4 mb-5">New Arrivals!</h4>
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
