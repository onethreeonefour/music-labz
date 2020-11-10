import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';
import { Link } from 'react-router-dom';

function Track(props) {

    const context = useContext(GlobalContext)
    const [Track, setTrack] = useState()

    let query = props.match.params.id;

    useEffect(() => {
        if (context.token) {
            axios(`https://api.spotify.com/v1/tracks/${query}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + context.token }
            })
                .then(res => {
                    setTrack(res.data)
                });
        }
    }, [context.token])

    return (
        <>
            {Track ?
                <div className="track-page-container ">
                    <div className="track-grid">
                        <div>
                            <iframe src={`https://open.spotify.com/embed/track/${Track.id}`} className="spotify-player" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="player"></iframe>
                        </div>
                        <div>
                            <h1>{Track.name} - <Link to={`/artist/${Track.artists[0].id}`}><span className="span-teal">{Track.artists[0].name}</span></Link> </h1>
                            <iframe src={`https://open.spotify.com/follow/1/?uri=${Track.artists[0].uri}&size=detail&theme=dark`} width="300" height="56" scrolling="no" frameBorder="0" style={{ border: "none", overflow: "hidden" }} allowtransparency="true" title="follow"></iframe>
                        </div>
                    </div>
                </div> :
                <div className='loading-container'>
                    <h1>Loading..</h1>
                </div>
            }
        </>
    )
}

export default Track
