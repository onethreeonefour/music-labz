import React from "react";

function Signup() {
  return (
    <div className="signup-container">
      <h1>
        Interested in MusicLabz? Start a <span>30 day free</span> trial
      </h1>
      <h3 style={{ fontSize: "0.8rem" }}>This is actually a Spotify API application. Go Support Spotify!</h3>
      <label>Email</label>
      <input placeholder="Put your email here to see the latest news!"></input>
      <button className="teal-button">Submit</button>
    </div>
  );
}

export default Signup;
