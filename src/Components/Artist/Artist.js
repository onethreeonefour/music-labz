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
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
function Artist(props) {

    const [artistInfo, setartistInfo] = useState()
    const [artistAlbum, setartistAlbum] = useState()
    const [artistTopTracks, setartistTopTracks] = useState()
    const [artistSimilar, setartistSimilar] = useState()

    const context = useContext(GlobalContext)

    useEffect(() => {
        let id = props.match.params.id;
        //Artist Information
        axios(`https://api.spotify.com/v1/artists/${id}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + context.token }
        })
            .then(res => {
                setartistInfo(res.data)
            });
        //Artist Albums
        axios(`https://api.spotify.com/v1/artists/${id}/albums?market=US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + context.token }
        })
            .then(res => {
                console.log(res.data.items)
                setartistAlbum(res.data)
            });
        //Artist Top Tracks
        axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + context.token }
        })
            .then(res => {
                setartistTopTracks(res.data)
            });
        //Similar Artists
        axios(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + context.token }
        })
            .then(res => {
                setartistSimilar(res.data)
            });

    }, [context.token])
    //console.log(artistInfo)
    console.log(artistAlbum)
    //console.log(artistTopTracks)
    //console.log(artistSimilar)

    return (
        <>
            {artistSimilar && artistTopTracks && artistAlbum && artistInfo ?
                <div className="artist-container" style={{
                    backgroundImage: `radial-gradient(
                    circle,
                    rgba(158, 56, 56, 0.9) 0%,
                    rgba(37, 8, 62, 1) 100%,
                    rgba(26, 27, 125, 1) 100%
                ),url(${artistInfo.images[0].url})`
                }}>
                    <>
                        <div className="artist-grid" >
                            <div>
                                <img src={artistInfo.images[0].url}></img>
                            </div>
                            <div>
                                <h1>{artistInfo.name}</h1>
                                <h3>Followers: {artistInfo.followers.total}</h3>
                                <h3 >Popularity: {artistInfo.popularity}</h3>
                                <h3>Known For</h3>
                                {artistInfo.genres.map((genres, index) => {
                                    return <p key={index}>{genres} </p>
                                })}
                                <br />
                                <h3>Popular Releases</h3>
                                <div className="artist-key-releases">
                                    <div>
                                        <Link to={`/album/${artistAlbum.items[0].id}`}><img src={artistAlbum.items[0].images[1].url} alt="latest"></img></Link>
                                        <h4>{artistAlbum.items[0].name} - {artistAlbum.items[0].release_date}</h4>
                                    </div>
                                    <div>
                                        <Link to={`/album/${artistAlbum.items[3].id}`}><img src={artistAlbum.items[3].images[1].url} alt="latest"></img></Link>
                                        <h4>{artistAlbum.items[3].name} - {artistAlbum.items[3].release_date}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="similar-and-top-tracks-container">
                            <div>
                                <h1>Top Tracks</h1>
                                {artistTopTracks.tracks.slice(0, 4).map((tracks, index) => {
                                    return <iframe src={`https://open.spotify.com/embed/track/${tracks.id}`} key={index} width="100%" height="80" frameBorder="0" allowtransparency="false" allow="encrypted-media" className="spotify-player-mini" title="tracks"></iframe>
                                })}
                            </div>
                            <div className="similar-artist-container">
                                <h1>Similar Artists</h1>
                                <div className="similar-artist-card-container">
                                    {artistSimilar.artists.slice(0, 6).map((similar, index) => {
                                        return <div key={index}>
                                            <div >
                                                <Link to={`/artist/${similar.id}`}><img src={similar.images[2].url} alt="similar-artist"></img></Link>
                                                <p>{similar.name}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="album-carousel-container">
                            <h1>Albums</h1>
                            <Carousel
                                responsive={responsive}
                                centerMode={true}
                                className="carousel"
                            >
                                {artistAlbum.items.map((el, index) => {
                                    return <Link to={`/album/${el.id}`}><div key={index}>
                                        <img src={el.images[0].url} alt="playlist" ></img>
                                        <h5>{el.name}</h5>
                                    </div></Link>
                                })}
                            </Carousel>
                        </div>
                    </>
                </div> :
                <div className="loading-container"><h1>Please Return To The Homepage Your Visitor Token May Have Expired</h1></div>
            }
        </>
    )
}

export default Artist
