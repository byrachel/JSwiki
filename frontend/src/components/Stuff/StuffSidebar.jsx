import React, { useContext, useState } from 'react';
import Button from 'react-bulma-components/lib/components/button';
import CategoriesList from './CategoriesList';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TiHeartOutline, TiFlashOutline } from 'react-icons/ti';
import useRequest from '../../hooks/useRequest';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const StuffSidebar = () => {

    const { userId, addLike } = useContext(UserContext);
    const [ update, setUpdate ] = useState(false);
    const { data } = useRequest(`${HEROKU_URL}/api/`);

    const handleLike = (id, like) => {
        addLike(id, like);
        setUpdate(!update);
    }

    return (
        <div>
            <img src="/images/developpeur-javascript.png" alt="Développeur web" className="illustration" />

            <h3 className="center"><strong>Recherche par catégorie</strong></h3>
            <br />
            <CategoriesList />

            <div className="login-container">
            <h3 className="center"><strong>Derniers ajouts</strong></h3>
            <br />
            <ul>
                { data.slice(Math.max(data.length - 5, 0)).reverse().map((stuff) =>
                <li key={stuff._id}>
                    <Link to={`/wikisheet/${stuff._id}`}>
                        <TiFlashOutline className="meta-icon vertical-center" /> 
                        <span className="regular-list">{stuff.title}</span>
                    </Link>
                    <span className="meta-maj">
                        ( {stuff.category} )
                        <TiHeartOutline className="meta-like-icon vertical-center" onClick={() => handleLike(stuff._id, stuff.like)} />{stuff.like} { stuff.like <2 ? 'fan' : 'fans' }
                    </span>
                </li>)}
            </ul>
            </div>

        </div>
    );
}

export default StuffSidebar;
