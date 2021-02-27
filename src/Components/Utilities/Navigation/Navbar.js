import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-logo-container">
          <Link to="/">
            <img src="mb.png" alt="mbrainz" className="nav-logo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
