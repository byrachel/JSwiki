import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TiFlashOutline, TiHeartOutline } from 'react-icons/ti';
import { config } from '../../Constants';
import axios from 'axios';

let HEROKU_URL = config.url.HEROKU_URL;

const Trending = ({ update, setUpdate }) => {

    const [ error, setError ] = useState(false);
    const [ popularData, setPopularData ] = useState([]);

    const addLike = (id, like) => {
        const newLike = {
            like: like +1
        }
        axios.put(`${HEROKU_URL}/api/like/${id}`, newLike)
        .then((res) => setUpdate(!update))
        .catch((err) => console.log(err))
    }

    const compareLike = (a, b) => {
        if(a.like < b.like){
                return -1;
        } else if(a.like > b.like){
                return 1;
        } else {
                return 0;
        }
    }

    useEffect(() => {
        axios.get(`${HEROKU_URL}/api/`)
        .then((res) => {
            setError(false);
            setPopularData(res.data.sort(compareLike).reverse().slice(0,5));
        })
        .catch((err) => setError(true))

    }, [update])

    return (

        <div className="card">
            <h3 className="center"><strong>Trending</strong></h3>
            <p className="center">___</p>
            <ul className="sidebar-list">
            { error ? <p>Données non accessibles pour le moment.</p> : <>
            { popularData.map((stuff) =>
                <li key={stuff._id}>
                    <Link to={`/wikisheet/${stuff._id}`}>
                        <TiFlashOutline className="meta-icon vertical-center margin-right" /> 
                        <span className="regular-list">{stuff.title}</span>
                    </Link>
                    <span className="meta-maj">
                        <Link to={`/wiki/${stuff.category}`}>( {stuff.category} )</Link>
                        <span className="right"><TiHeartOutline className="like-icon vertical-center" onClick={() => addLike(stuff._id, stuff.like)} />{stuff.like} </span>

                    </span>
                </li>
            )}
            </>}
            </ul>
        </div>
    );
}

export default Trending;
