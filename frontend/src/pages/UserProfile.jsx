import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import Columns from 'react-bulma-components/lib/components/columns';
import { config } from '../Constants';
import axios from 'axios';
import { TiHeartFullOutline } from 'react-icons/ti';

let HEROKU_URL = config.url.HEROKU_URL;

export default function UserProfile() {

    const params = useParams();
    const authorId = params.id;
    const [ userAccount, setUserAccount ] = useState([]);

    // Récupérer toutes les publications de l'auteur
    const { data, error } = useRequest(`${HEROKU_URL}/api/author/${authorId}`);

    // Récupérer les informations générales de l'auteur
    useEffect(() => {
        if(authorId !== null) {
            axios.get(`${HEROKU_URL}/auth/user/${authorId}`, {withCredentials: true})
            .then((res) => setUserAccount(res.data))
            .catch((err) => console.log(err))
        }
    }, [authorId]);

    return (

        <div className="light-card">
            <div className="centered-container">
                <Columns>
                    <Columns.Column size={8}>
                        <h2>Profil de : {userAccount.firstname} {userAccount.lastname}</h2>
                        <div className="separator"></div>

                        <p>{userAccount.bio}</p>
                        <br />
                        <p>Github : {userAccount.github}</p>
                        <p>Website : <a href={userAccount.website}>{userAccount.website}</a></p>
                        <br />

                        <h3><strong>Contributions :</strong></h3>
                        <div className="separator"></div>

                        { error ?
                            <p>Aucune publication pour le moment.</p>
                        :
                        <>
                            {data.reverse().map((post) =>
                            <li key={post._id}>
                                <Link to={`/wikisheet/${post._id}`}><span className="regular-list"><strong>{post.title} </strong></span></Link>
                                { post.like >=1 ? 
                                    <span className="link"><TiHeartFullOutline className="small-like" />{post.like} { post.like <2 ? ' fan' : ' fans' }</span>: null}
                            </li>)}
                        </>
                        } 
                    </Columns.Column>

                    <Columns.Column size={4}>
                    <img src="/images/wiki-javascript.png" alt="Développeur web" className="illustration" />
                    </Columns.Column>
                </Columns>
            </div>
        </div>
                    
    )
}
