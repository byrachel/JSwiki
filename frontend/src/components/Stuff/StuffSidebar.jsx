import React, { useEffect, useState } from 'react';
import CategoriesList from './CategoriesList';
import { Link } from 'react-router-dom';
import { TiFlashOutline, TiHeartOutline, TiFlash } from 'react-icons/ti';
import { config } from '../../Constants';
import axios from 'axios';

let HEROKU_URL = config.url.HEROKU_URL;

const StuffSidebar = () => {

    const [ lastTopics, setLastTopics ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ update, setUpdate ] = useState(false);
    const [ popularData, setPopularData ] = useState([]);

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
            setPopularData(res.data.sort(compareLike).reverse().slice(0,5));
        })
        .catch((err) => setError(true))
    }, [update])

    const compareLike = (a, b) => {
        if(a.like < b.like){
                return -1;
        } else if(a.like > b.like){
                return 1;
        } else {
                return 0;
        }
    }

    return (
        <div>
            <img src="/images/developpeur-javascript.png" alt="Développeur web" className="illustration" />
            <div className="card">
                <h3 className="center"><strong>Recherche par catégorie</strong></h3>
                <p className="center">___</p>
                <br />
                <CategoriesList />
                <br />
            </div>

            <div className="card">
                <h3 className="center"><strong>Top 5</strong></h3>
                <p className="center">___</p>
                <ul className="sidebar-list">
                { error ? <p>Données non accessibles pour le moment.</p> : <>
                { popularData.map((stuff) =>
                    <li key={stuff._id}>
                        <Link to={`/wikisheet/${stuff._id}`}>
                            <TiFlash className="meta-icon vertical-center margin-right" /> 
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
