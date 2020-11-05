import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../Context/Context';

function Album(props) {
    const [album, setalbum] = useState()
    const context = useContext(GlobalContext)
    console.log(context)
    useEffect(() => {
        let id = props.match.params.id;
        axios(`https://api.spotify.com/v1/albums/${id}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + context.token }
        })
            .then(res => {
                //console.log(res)
                setalbum(res.data)
            });

    }, [context.token])

    console.log(album)

    return (
        <div className="album-container">
            {album ?
                <div className="album-grid">
                    <div>
                        <img src={album.images[0].url}></img>
                        <p>{album.name}</p>
                    </div>
                    <div>
                    </div>
                </div> :
                <div>Loading</div>}
        </div>
    )
}

export default Album
