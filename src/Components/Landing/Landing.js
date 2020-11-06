import React, { useState, useEffect, useContext } from 'react';
import { CLIENT_ID, CLIENT_SECRET } from '../../Config'
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';
import Recommended from './Recommended'
import Sales from './Sales'
import Signup from './Signup'
import { Link } from 'react-router-dom'
import Blank from '../../Images/blank.jpg'

const lazyImage = [0, 1, 2, 4, 5, 6]
function Landing() {
    const context = useContext(GlobalContext)
    const [newReleases, setnewReleases] = useState([])

    useEffect(() => {
        //Authorization - requesting token with CLIENT_ID & SECRET
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
            //Spotify gives token & then can send requests with Token - Might put this in global context
            .then(tokenResponse => {
                //Set token in Global context - used throughout application for later
                context.setglobal({ token: tokenResponse.data.access_token });
                axios('https://api.spotify.com/v1/browse/new-releases?locale=sv_US', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                })
                    .then(res => {
                        //console.log(res)
                        setnewReleases(res.data.albums.items)
                        //console.log(context.token)
                    });

            });

    }, [])
    return (
        <>
            <div className="hero-container">
                <div className="hero-grid">
                    <div>
                        <h1>MusicLabz.<br /> The Premier Music Database and Stream.</h1>
                        <input name="search" ></input>
                        <button className="teal-button"> Search</button>
                        <br />
                        <p className="scroll-down">SCROLL DOWN</p>
                    </div>
                    <div >
                        <h1>Hottest Releases</h1>
                        <div className='hero-new-releases'>
                            {newReleases.length > 0 ? newReleases.slice(0, 6).map((releases, index) => {
                                return <Link to={`/album/${releases.id}`} key={index}>
                                    <div key={index}>
                                        <img src={releases.images[0].url} alt="new-releases"></img>
                                        <p>{releases.name}</p>
                                        <p>{releases.artists[0].name} </p>
                                    </div>
                                </Link>
                            }) : <div className='hero-new-releases'>{lazyImage.map((el, index) => { return <div key={index}><img src={Blank} alt="blank"></img><p>Loading..</p></div> })}</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sales-landing-container">
                <Sales />
            </div>
            <div className="recommended-container">
                <Recommended />
            </div>
            <div className="signup-landing-container">
                <Signup />
            </div>
        </>
    )
}

export default Landing
