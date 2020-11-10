import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';

function Playlist(props) {
    const context = useContext(GlobalContext)
    const [Playlist, setPlaylist] = useState()

    let query = props.match.params.id;

    useEffect(() => {
        if (context.token) {
            axios(`https://api.spotify.com/v1/playlists/${query}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + context.token }
            })
                .then(res => {
                    setPlaylist(res.data)
                });
        }
    }, [context.token])
    return (
        <>
            {Playlist ?
                <div className="playlist-container" style={{
                    backgroundImage: `radial-gradient(
                    circle,
                    rgba(158, 56, 56, 0.9) 0%,
                    rgba(37, 8, 62, 1) 100%,
                    rgba(26, 27, 125, 1) 100%
                ),url(${Playlist.images[0].url})`
                }}>
                    <div className="playlist-grid" >
                        <div>
                            <img src={Playlist.images[0].url} alt="album-art"></img>
                        </div>
                        <div className="album-info">
                            <iframe src={`https://open.spotify.com/embed/playlist/${Playlist.id}`} className="spotify-player" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="player"></iframe>
                            <h1>{Playlist.name}</h1>
                            <h3>Followers: <span className="span-teal">{Playlist.followers.total}</span></h3>
                            <iframe src={`https://open.spotify.com/follow/1/?uri=${Playlist.owner.uri}&size=detail&theme=dark`} width="300" height="56" scrolling="no" frameBorder="0" style={{ border: "none", overflow: "hidden" }} allowtransparency="true" title="follow"></iframe>
                            <p>{Playlist.description}</p>
                        </div>
                    </div>
                </div> : <div className="loading-container">Loading</div>}
        </>
    )
}

export default Playlist