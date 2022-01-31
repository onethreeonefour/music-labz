import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-logo-container">
          <Link to="/">
            <p>
              MUSIC.<strong>LABZ</strong>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
