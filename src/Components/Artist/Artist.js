import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
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
        //console.log(res.data.items)
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
        setartistSimilar(res.data);
      });
    }
  }, [context.token, props]);
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
            <div className="artist-grid">
              <div>
                <img src={artistInfo.images[0].url} alt="profile" className="artist-image"></img>
              </div>
              <div>
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
                <h4>Known For</h4>
                {artistInfo.genres.map((genres, index) => {
                  return <p key={index}>{genres} </p>;
                })}
                <br />
                <h3>Latest Releases</h3>
                <div className="artist-key-releases">
                  <div>
                    <Link to={`/album/${artistAlbum.items[0].id}`}>
                      <img src={artistAlbum.items[0].images[1].url} alt="latest"></img>
                    </Link>
                    <h4>
                      {artistAlbum.items[0].name} - {artistAlbum.items[0].release_date}
                    </h4>
                  </div>
                  <div>
                    <Link to={`/album/${artistAlbum.items[1].id}`}>
                      <img src={artistAlbum.items[1].images[1].url} alt="latest"></img>
                    </Link>
                    <h4>
                      {artistAlbum.items[1].name} - {artistAlbum.items[1].release_date}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="similar-and-top-tracks-container">
              <div>
                <h1>Top Tracks</h1>
                {artistTopTracks.tracks.slice(0, 4).map((tracks, index) => {
                  return (
                    <iframe
                      src={`https://open.spotify.com/embed/track/${tracks.id}`}
                      key={index}
                      width="95%"
                      height="80"
                      frameBorder="0"
                      allowtransparency="false"
                      allow="encrypted-media"
                      className="spotify-player-mini"
                      title="tracks"
                    ></iframe>
                  );
                })}
              </div>
              <div className="similar-artist-container">
                <h1>Similar Artists</h1>
                <div className="similar-artist-card-container">
                  {artistSimilar.artists.slice(0, 6).map((similar, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <Link to={`/artist/${similar.id}`}>
                            <img src={similar.images[2].url} alt="similar-artist"></img>
                          </Link>
                          <p>{similar.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="album-carousel-container">
              <h1>Albums</h1>
              <Carousel responsive={responsive} centerMode={true} className="carousel">
                {artistAlbum.items.map((el, index) => {
                  return (
                    <Link to={`/album/${el.id}`}>
                      <div key={index}>
                        <img src={el.images[0].url} alt="playlist"></img>
                        <h5>{el.name}</h5>
                      </div>
                    </Link>
                  );
                })}
              </Carousel>
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
