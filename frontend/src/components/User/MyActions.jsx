import React, { useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const MyActions = () => { 

    const { userProfile } = useContext(UserContext);
    const author = `${userProfile.firstname}/${userProfile.lastname}`
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/${author}`);

    console.log(data)

    return (
        <div className="light-card">
            <h3> Mes contributions :</h3>

            {loading ?
                <p>Chargement en cours...</p>
            : null }

            {error ?
                <h2>Une erreur s'est produite. Le contenu n'est pas accessible.</h2>
            : null }

            {data.map((post) =>
                <li key={post._id}>
                    <Link to={`/wikisheet/${post._id}`}>
                        <span className="regular-list">
                            <strong>{post.title} </strong>
                        </span>
                    </Link>
                    <Link to ={`/wikiedit/${post._id}`}>
                        <span className="meta-maj">update</span>
                    </Link>
                    { post.like >=1 ? 
                        <span className="link">
                            {post.like} { post.like <2 ? ' fan' : ' fans' }
                        </span>
                    : null}
                </li>
            )}
            <Link to="/createressource"><Button rounded className="button is-danger"><p>Ajouter une ressource</p></Button></Link>      
        </div>
    );
}

export default MyActions;
