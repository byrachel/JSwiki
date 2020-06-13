import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useParams, Link } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import Columns from 'react-bulma-components/lib/components/columns';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export default function UserProfile() {

    const { displayOneUser, userAccount } = useContext(UserContext);
    const params = useParams();
    const userId = params.id;

    // Récupérer les publications de l'utilisateur
    const author = `${userAccount.firstname}/${userAccount.lastname}`
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/${author}`);

    useEffect(() => {
        displayOneUser(userId)
      }, [userId]);


    return (

        <div className="light-card">

            <Columns breakpoint="mobile">
                <Columns.Column size={4}>
                    <h2>{userAccount.firstname} {userAccount.lastname}</h2>
                    <div className="separator"></div>
                    <p><strong>Bio : </strong>{userAccount.bio}</p>
                    <br />
                    <p>Github : {userAccount.github}</p>
                    <p>Website : {userAccount.website}</p>
                </Columns.Column>

                <Columns.Column size={4}>
                    <h3>> Contributions :</h3>
                    <div className="separator"></div>
                    {data.map((post) =>
                    <li key={post._id}>
                        <Link to={`/wikisheet/${post._id}`}><span className="regular-list"><strong>{post.title} </strong></span></Link>
                        <Link to ={`/wikiedit/${post._id}`}><span className="meta-maj">update</span></Link>
                        { post.like >=1 ? 
                            <span className="link">{post.like} { post.like <2 ? ' fan' : ' fans' }</span>: null}
                    </li>)}
                </Columns.Column>

                <Columns.Column size={4}>
                    <img src="/images/wiki-javascript.png" alt="Développeur web" />
                </Columns.Column>
            </Columns>

        </div>
                    
    )
}
