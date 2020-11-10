import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function SearchResults(props) {
    const [Artists, setArtists] = useState();
    const [Albums, setAlbums] = useState();
    const [Playlists, setPlaylists] = useState()
    const [Tracks, setTracks] = useState()

    const context = useContext(GlobalContext)
    useEffect(() => {
        let query = props.match.params.query;
        if (context.token) {
            axios(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist,track`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + context.token }
            })
                .then(res => {
                    //console.log(res)
                    setArtists(res.data.artists);
                    setAlbums(res.data.albums);
                    setPlaylists(res.data.playlists);
                    setTracks(res.data.tracks)
                });
        }

    }, [context.token, props])

    return (
        <>
            {Artists && Albums && Tracks && Playlists ?
                <div className='search-container'>
                    <h1>Found Artists</h1>
                    <div className="search-grid-header">
                        <div>
                            <Link to={`/artist/${Artists.items[0].id}`}>
                                <img src={Artists.items[0].images[0].url} alt="top-artist" className="search-top-artist"></img>
                                <h2>{Artists.items[0].name}</h2>
                            </Link>
                        </div>
                        <div className="search-grid-more-artist">
                            {Artists.items.map((artist, index) => {
                                if (artist.images.length > 0) {
                                    return <React.Fragment key={index}>
                                        <div key={index}>
                                            <Link to={`/artist/${artist.id}`}>
                                                <img src={artist.images[1].url} alt="profile"></img>
                                                <h4>{artist.name}</h4>
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                }
                                else return <></>

                            })}
                        </div>
                    </div>
                    <div>
                        <hr />
                        <h1>Playlists</h1>
                        <Carousel
                            responsive={responsive}
                            centerMode={true}
                            className="carousel"
                        >
                            {Playlists.items.map((el, index) => {
                                return <Link to={`/playlist/${el.id}`} key={index}>
                                    <div key={index}>
                                        <img src={el.images[0].url} alt="playlist" ></img>
                                        <h5>{el.name}</h5>
                                    </div></Link>
                            })}
                        </Carousel>
                    </div>
                    <hr />
                    <div className="albums-tracks-container">
                        <div>
                            <h1>Albums</h1>
                            {Albums.items.map((el, index) => {
                                return <Link to={`/album/${el.id}`} key={index}>
                                    <div className="track-container" key={index}>
                                        <p>{el.name}</p>
                                        <img src={el.images[2].url} alt="playlist" className="card-image"></img>
                                    </div>
                                </Link>
                            })}
                        </div>
                        <div>
                            <h1>Tracks</h1>
                            {Tracks.items.map((el, index) => {
                                return <Link to={`/track/${el.id}`} key={index}>
                                    <iframe src={`https://open.spotify.com/embed/track/${el.id}`} key={index} width="100%" height="80" frameBorder="0" allowtransparency="false" allow="encrypted-media" className="spotify-player-mini" title="tracks" key={index}></iframe>
                                </Link>
                            })}
                        </div>

                    </div>
                </div> :
                <div className='loading-container'>
                    <h1>Loading..</h1>
                </div>}

        </>
    )
}

export default SearchResults
