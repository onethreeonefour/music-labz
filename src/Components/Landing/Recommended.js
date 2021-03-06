import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

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

function Recommended() {
    const context = useContext(GlobalContext)
    const [playlist, setplaylist] = useState([])


    useEffect(() => {
        //If Token has been initialized then post/get methods can be done
        if (context.token.length > 0) {
            axios('https://api.spotify.com/v1/browse/featured-playlists?country=AU', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + context.token }
            })
                .then(res => {
                    //console.log(res)
                    setplaylist(res.data.playlists.items)
                });
        }

    }, [context.token])

    const renderCards = playlist.map((el, index) => {
        return <Link to={`/playlist/${el.id}`} key={index}><div>
            <img src={el.images[0].url} alt="playlist" ></img>
        </div>
        </Link>
    })

    return (
        <div>
            <h1>Our Curated Playlist</h1>
            {playlist.length > 0 ? <Carousel
                responsive={responsive}
                centerMode={true}
                className="carousel"
            >
                {renderCards}
            </Carousel> : <h2>Loading</h2>}

        </div>
    )
}

export default Recommended
