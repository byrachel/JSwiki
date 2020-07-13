import React from 'react';
import CategoriesList from './CategoriesList';
import { Link } from 'react-router-dom';
import { TiFlashOutline } from 'react-icons/ti';
import useRequest from '../../hooks/useRequest';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const StuffSidebar = () => {

    const { data } = useRequest(`${HEROKU_URL}/api/`);

    return (
        <div>
            <img src="/images/developpeur-javascript.png" alt="Développeur web" className="illustration" />

            <h3 className="center"><strong>Recherche par catégorie</strong></h3>
            <br />
            <CategoriesList />

            <div className="login-container">
            <h3 className="center"><strong>Derniers ajouts</strong></h3>
            <br />
            <ul className="sidebar-list">
                { data.slice(Math.max(data.length - 5, 0)).reverse().map((stuff) =>
                <li key={stuff._id}>
                    <Link to={`/wikisheet/${stuff._id}`}>
                        <TiFlashOutline className="meta-icon vertical-center margin-right" /> 
                        <span className="regular-list">{stuff.title}</span>
                    </Link>
                    <span className="meta-maj">
                        <Link to={`/wiki/${stuff.category}`}>( {stuff.category} )</Link>
                    </span>
                </li>)}
            </ul>
            </div>

        </div>
    );
}

export default StuffSidebar;
