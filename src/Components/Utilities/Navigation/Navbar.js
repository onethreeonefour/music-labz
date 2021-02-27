import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <Link to="/">MusicLabz</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
