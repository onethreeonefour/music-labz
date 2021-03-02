import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";

function Playlist(props) {
  const context = useContext(GlobalContext);
  const [Playlist, setPlaylist] = useState();

  let query = props.match.params.id;

  useEffect(() => {
    if (context.token) {
      axios(`https://api.spotify.com/v1/playlists/${query}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        setPlaylist(res.data);
      });
    }
  }, [context.token]);
  return (
    <>
      {Playlist ? (
        <div
          className="playlist-container"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(123,10,176,0.4) 0%, rgba(59,3,103,0.8) 35%, rgba(0,0,0,0.9) 100%),url(${Playlist.images[0].url})`,
          }}
        >
          <div className="playlist-grid">
            <div>
              <img src={Playlist.images[0].url} alt="album-art"></img>
            </div>
            <div className="playlist-info">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${Playlist.id}`}
                className="spotify-player"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="player"
              ></iframe>
              <h1>{Playlist.name}</h1>
              <h3>
                Followers: <span className="span-teal">{Playlist.followers.total}</span>
              </h3>
              <iframe
                src={`https://open.spotify.com/follow/1/?uri=${Playlist.owner.uri}&size=detail&theme=dark`}
                width="300"
                height="56"
                scrolling="no"
                frameBorder="0"
                style={{ border: "none", overflow: "hidden" }}
                allowtransparency="true"
                title="follow"
              ></iframe>
              <p>{Playlist.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <h1>Loading</h1>
        </div>
      )}
    </>
  );
}

export default Playlist;
