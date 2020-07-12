import React, { useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';
import { TiHeartOutline } from 'react-icons/ti';

let HEROKU_URL = config.url.HEROKU_URL;

const MyActions = () => { 

    const { userId } = useContext(UserContext);
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/author/${userId}`);

    return (
        <div className="light-card">
            <h3> Mes contributions :</h3>
            <div className="separator"></div>

            {loading ?
                <p>Chargement en cours...</p>
            : 

                error ?
                    <h2>Une erreur s'est produite. Le contenu n'est pas accessible.</h2>
                : null 
            }

                {data.map((post) =>
                    <li key={post._id}>
                        <Link to={`/wikisheet/${post._id}`}>
                            <span className="regular-list">
                                <strong>{post.title}</strong>
                            </span>
                        </Link>
                        <span className="meta-maj">
                        ({post.category})
                        <TiHeartOutline className="meta-like-icon vertical-center" />{post.like} 
                        </span>
                    </li>
                )}
            <br />
            <Link to="/createressource"><Button rounded className="button is-danger is-small">Ajouter une ressource</Button></Link>      
        </div>
    );
}

export default MyActions;
