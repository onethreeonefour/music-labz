import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import { Link } from "react-router-dom";

function Artist(props) {
  const [artistInfo, setartistInfo] = useState();
  const [artistAlbum, setartistAlbum] = useState();
  const [artistTopTracks, setartistTopTracks] = useState();
  const [artistSimilar, setartistSimilar] = useState();

  const context = useContext(GlobalContext);

  useEffect(() => {
    let id = props.match.params.id;
    if (context.token) {
      //Artist Information
      axios(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        setartistInfo(res.data);
      });
      //Artist Albums
      axios(`https://api.spotify.com/v1/artists/${id}/albums?market=US`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        setartistAlbum(res.data);
      });
      //Artist Top Tracks
      axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        setartistTopTracks(res.data);
      });
      //Similar Artists
      axios(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        console.log(res);
        setartistSimilar(res.data);
      });
    }
  }, [context.token, props]);

  useEffect(() => {}, []);
  return (
    <>
      {artistSimilar && artistTopTracks && artistAlbum && artistInfo ? (
        <div
          className="artist-container"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(123,10,176,0.8) 0%, rgba(59,3,103,0.95) 35%, rgba(0,0,0,1) 100%),url(${artistInfo.images[0].url})`,
          }}
        >
          <>
            <div className="artist-banner">
              <img src={artistInfo.images[0].url} alt="profile"></img>
              <h1>{artistInfo.name}</h1>
              <iframe
                src={`https://open.spotify.com/follow/1/?uri=${artistInfo.uri}&size=detail&theme=dark`}
                width="300"
                height="56"
                scrolling="no"
                frameBorder="0"
                style={{ border: "none", overflow: "hidden" }}
                allowtransparency="true"
                title="follow"
              ></iframe>
              <div className="genres">
                <h4>Known For</h4>
                {artistInfo.genres.map((genres, index) => {
                  return <p key={index}>{genres} </p>;
                })}
              </div>
              <div className="overlay"></div>
            </div>

            <div className="latest-album-wrapper">
              <div className="album-heading-container">
                <h1>Albums</h1>
                <hr />
              </div>
              <div className="album-info-container">
                <div>
                  <img src={artistAlbum.items[0].images[0].url} alt="latest"></img>
                </div>
                <div className="album-info">
                  <span className="span-teal " style={{ fontWeight: 700 }}>
                    Album
                  </span>
                  <h1>{artistAlbum.items[0].name}</h1>
                  <h3>{artistAlbum.items[0].release_date}</h3>
                  <iframe
                    src={`https://open.spotify.com/embed/album/${artistAlbum.items[0].id}`}
                    width="100"
                    height="380"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="latest-album"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="top-tracks-wrapper">
              <div>
                <div className="album-heading-container">
                  <h1>Popular Songs</h1>
                  <hr />
                </div>

                <div className="top-tracks-container">
                  {artistTopTracks.tracks.map((tracks, index) => {
                    return (
                      <iframe
                        src={`https://open.spotify.com/embed/track/${tracks.id}`}
                        key={index}
                        width="300"
                        height="300"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        className="spotify-player-mini"
                        title="tracks"
                      ></iframe>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="similar-artist-wrapper">
              <div className="album-heading-container">
                <h1>Similar Artists</h1>
                <hr />
              </div>
              <div className="similar-artist-container">
                {artistSimilar.artists.map((similar, index) => {
                  if (similar.images.length > 0)
                    return (
                      <div key={index}>
                        <div>
                          <Link to={`/artist/${similar.id}`}>
                            <img src={similar.images[0].url} alt="similar-artist"></img>
                          </Link>
                          <p>{similar.name.slice(0, 15)}</p>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
            <div className="artist-albums-wrapper">
              <div className="album-heading-container">
                <h1>Albums</h1>
                <hr />
              </div>
              <div className="albums-container">
                {artistAlbum.items.map((el, index) => {
                  return (
                    <Link to={`/album/${el.id}`} key={index}>
                      <div id="album-scroll">
                        <img src={el.images[1].url} alt="playlist"></img>
                        <h5>{el.name}</h5>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        </div>
      ) : (
        <div className="loading-container">
          <h1>Loading</h1>
        </div>
      )}
    </>
  );
}

export default Artist;
