import React from "react";
import { FaMusic, FaHeadphones, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ComingSoonPage.css";

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="music-note-animation">
        <FaMusic className="note1" />
        <FaMusic className="note2" />
        <FaHeadphones className="headphones" />
      </div>
      <h1>Coming Soon</h1>
      <p className="tagline">Get ready for an amazing musical journey</p>
      <div className="pulse-circle"></div>
      <button className="go-back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: "10px" }} /> Go Back
      </button>
    </div>
  );
};

export default ComingSoonPage;
