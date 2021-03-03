import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import { Link } from "react-router-dom";

function Album(props) {
  const [album, setalbum] = useState();
  const context = useContext(GlobalContext);

  useEffect(() => {
    //console.log(context.token)
    let id = props.match.params.id;
    if (context.token) {
      axios(`https://api.spotify.com/v1/albums/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        setalbum(res.data);
        document.title = `MusicLabz - ${res.data.name}`;
      });
    }
  }, [context.token, props.match.params.id]);

  return (
    <>
      {album ? (
        <div
          className="album-container"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(123,10,176,0.4) 0%, rgba(59,3,103,0.8) 35%, rgba(0,0,0,0.9) 100%),url(${album.images[0].url})`,
          }}
        >
          <div className="album-grid">
            <div>
              <img src={album.images[0].url} alt="album-art"></img>
            </div>
            <div className="album-info">
              <iframe
                src={`https://open.spotify.com/embed/album/${album.id}`}
                className="spotify-player"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="player"
              ></iframe>
              <h1>
                {album.name} -{" "}
                <Link to={`/artist/${album.artists[0].id}`}>
                  <span className="album-artist">{album.artists[0].name}</span>
                </Link>{" "}
              </h1>
              <iframe
                src={`https://open.spotify.com/follow/1/?uri=${album.artists[0].uri}&size=detail&theme=dark`}
                width="300"
                height="56"
                scrolling="no"
                frameBorder="0"
                style={{ border: "none", overflow: "hidden" }}
                allowtransparency="true"
                title="follow"
              ></iframe>
              <h3>Popularity: {album.popularity}</h3>
              <h3>Release Date: {album.release_date}</h3>
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

export default Album;
