import React from "react";

function Signup() {
  return (
    <div className="signup-container">
      <h1>
        Interested in MusicLabz? Start a <span>30 day free</span> trial
      </h1>
      <h3 style={{ fontSize: "0.8rem" }}>This is actually a Spotify API application. Go Support Spotify!</h3>
      <label>Enter your email for a free trial!</label>
      <input placeholder="Enter your email address"></input>
      <button className="teal-button">Submit</button>
    </div>
  );
}

export default Signup;
