import React, { useContext, useState } from 'react';
import Button from 'react-bulma-components/lib/components/button';
import CategoriesList from './CategoriesList';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TiHeartOutline, TiFlash } from 'react-icons/ti';
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

            <h3>Recherche par catégorie</h3>
            <div className="separator"></div>
            <CategoriesList />

            <br />
            <h3>Derniers ajouts :</h3>
            <div className="separator"></div>
            <ul>
                { data.slice(Math.max(data.length - 5, 0)).map((stuff) =>
                <li key={stuff._id}>
                    <Link to={`/wikisheet/${stuff._id}`}>
                        <TiFlash className="meta-icon vertical-center" /> 
                        <span className="regular-list">{stuff.title}</span>
                    </Link>
                    <span className="meta-maj">
                        ( {stuff.category} )
                        <TiHeartOutline className="meta-like-icon vertical-center" onClick={() => handleLike(stuff._id, stuff.like)} />{stuff.like} { stuff.like <2 ? 'fan' : 'fans' }
                    </span>
                </li>)}
            </ul>
            <br />
            <div className="center">
                { userId != null ?
                <Link to="/createressource"><Button rounded className="button is-danger"><p>Ajouter une ressource</p></Button></Link>
                :
                <Link to="/createaccount"><Button rounded className="button is-danger"><p>Ajouter une ressource</p></Button></Link>
                }
            </div>
        </div>
    );
}

export default StuffSidebar;
