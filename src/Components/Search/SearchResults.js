import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import Artist from "../Artist/Artist";

function SearchResults(props) {
  const [Artists, setArtists] = useState();
  const [Albums, setAlbums] = useState();
  const [Playlists, setPlaylists] = useState();

  const context = useContext(GlobalContext);
  useEffect(() => {
    let query = props.match.params.query;
    if (context.token) {
      axios(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist,track`, {
        method: "GET",
        headers: { Authorization: "Bearer " + context.token },
      }).then((res) => {
        console.log(res);
        setArtists(res.data.artists);
        setAlbums(res.data.albums);
        setPlaylists(res.data.playlists);
      });
    }
  }, [context.token, props]);

  return (
    <>
      {Artists && Albums && Playlists && Artists.items.length > 0 ? (
        <div className="search-container">
          <div className="artist-search-container">
            <div className="album-heading-container">
              <h1>Found Artists</h1>
              <hr />
            </div>
            <div className="search-grid-header">
              <div className="search-top-result-artist">
                <Link to={`/artist/${Artists.items[0].id}`}>
                  <img src={Artists.items[0].images[0].url} alt="top-artist" className="search-top-artist"></img>

                  <h2>{Artists.items[0].name}</h2>
                </Link>
              </div>
              <div className="search-grid-more-artist">
                {Artists.items.map((artist, index) => {
                  if (artist.images.length > 0) {
                    return (
                      <React.Fragment key={index}>
                        <div key={index}>
                          <Link to={`/artist/${artist.id}`}>
                            <img src={artist.images[1].url} alt="profile"></img>
                            <h4>{artist.name.slice(0, 15)}</h4>
                          </Link>
                        </div>
                      </React.Fragment>
                    );
                  } else return <></>;
                })}
              </div>
            </div>
          </div>
          <div className="albums-tracks-container">
            <div>
              <div className="album-heading-container">
                <h1>Albums</h1>
                <hr />
              </div>
              <div className="search-album-flex-container">
                {Albums.items.map((el, index) => {
                  return (
                    <Link to={`/album/${el.id}`} key={index}>
                      <div className="track-container" key={index}>
                        <img src={el.images[1].url} alt="playlist" className="card-image"></img>
                        <p>{el.name.slice(0, 30)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="search-playlist-wrapper">
            <div className="album-heading-container">
              <h1>Playlists</h1>
              <hr />
            </div>
            <div className="playlist-flex-container">
              {Playlists.items.map((el, index) => {
                return (
                  <Link to={`/playlist/${el.id}`} key={index}>
                    <div key={index}>
                      {el.images[0].url.length > 0 ? (
                        <div>
                          <img src={el.images[0].url} alt="playlist"></img>
                          <h5>{el.name.slice(0, 30)}</h5>
                        </div>
                      ) : (
                        <span></span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <h1>Loading..</h1>
        </div>
      )}
    </>
  );
}

export default SearchResults;
