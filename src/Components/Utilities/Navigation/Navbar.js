import React from 'react'
import './Navigation.css';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    <Link to="/">MusicLabz</Link>
                </div>
            </div>
            <div className="nav-btn">
                <label htmlFor="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
            </div>
        </div >
    )
}

export default Navbar

