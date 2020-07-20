import React, { useEffect, useState } from 'react';
import CategoriesList from './CategoriesList';
import { Link } from 'react-router-dom';
import { TiFlashOutline, TiHeartOutline } from 'react-icons/ti';
import { config } from '../../Constants';
import axios from 'axios';
import Trending from './Trending';

let HEROKU_URL = config.url.HEROKU_URL;

const StuffSidebar = () => {

    const [ lastTopics, setLastTopics ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ update, setUpdate ] = useState(false);

    const addLike = (id, like) => {
        const newLike = {
            like: like +1
        }
        axios.put(`${HEROKU_URL}/api/like/${id}`, newLike)
        .then((res) => setUpdate(!update))
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(`${HEROKU_URL}/api/`)
        .then((res) => {
            setError(false);
            setLastTopics(res.data.reverse().slice(0,5));
        })
        .catch((err) => setError(true))

    }, [update])

    return (
        <div>
            <img src="/images/developpeur-javascript.png" alt="Développeur web" className="illustration" />

            <h3 className="center"><strong>Recherche par catégorie</strong></h3>
            <p className="center">___</p>
            <br />
            <CategoriesList />
            <br />

            <Trending update={update} setUpdate={setUpdate} />

            <div className="login-container">
                <h3 className="center"><strong>Derniers ajouts</strong></h3>
                { error ? <p>Données inaccessibles</p> : <p className="center">___</p>}
                <br />
                <ul className="sidebar-list">
                    { lastTopics.map((stuff) =>
                    <li key={stuff._id}>
                        <Link to={`/wikisheet/${stuff._id}`}>
                            <TiFlashOutline className="meta-icon vertical-center margin-right" /> 
                            <span className="regular-list">{stuff.title}</span>
                        </Link>
                        <span className="meta-maj">
                            <Link to={`/wiki/${stuff.category}`}>( {stuff.category} )</Link>
                            <span className="right"><TiHeartOutline className="like-icon vertical-center" onClick={() => addLike(stuff._id, stuff.like)} />{stuff.like} </span>

                        </span>
                    </li>)}
                </ul>
            </div>

        </div>
    );
}

export default StuffSidebar;
