import React, { useEffect, useContext } from 'react';
import { TiHeartFullOutline, TiFlash, TiFlashOutline } from 'react-icons/ti';
import { WikiContext } from '../../context/WikiContext';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';
import { useDate } from '../../hooks/useDate';
import { UserContext } from '../../context/UserContext';


const RessourceDetails = (props) => {

    const id = props.value;
    const { getRessourceDetails, stuffDetails, addLike, stuffLikes } = useContext(WikiContext);
    const { userId } = useContext(UserContext)

    const handleLike = (id, like) => {
        addLike(id, like)
    }

    useEffect(() => {
        getRessourceDetails(id)
    }, [stuffLikes]);


    return (
        <div className="container">
            <div className="light-card">

                <h3>> Wiki </h3>
                <div className="separator"></div>
            </div>

            <div className="card-details">
                <p className="vertical-center right"><TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(stuffDetails._id, stuffDetails.like)} />
                {stuffDetails.like} { stuffDetails.like <2 ? 'fan' : 'fans' }</p>

                <h1 className="heading-ressource">{stuffDetails.title}</h1>
                {/* <p className="meta">{stuffDetails.resum}</p> */}
                <br />

                <div dangerouslySetInnerHTML={{ __html: stuffDetails.content }}></div>
                <br />

                <p className="resum"><strong>En savoir plus : </strong><a href={stuffDetails.link}>{stuffDetails.link}</a></p>

                <br />
                <div className="separator"></div>
                { userId != null ?
                <Link to ={`/wikiedit/${id}`}><Button rounded className="button is-danger right" outlined>Mettre à jour</Button></Link>
                :
                <Link to ={`/createaccount`}><Button rounded className="button is-danger right" outlined>Mettre à jour</Button></Link>
                }
                <p className="meta-info"><TiFlash className="meta-icon vertical-center" /> Créé le {useDate(stuffDetails.date)} par <Link to={`/useraccount/${stuffDetails.authorId}`}>{stuffDetails.author}</Link></p>
                <p className="meta-info"><TiFlashOutline className="meta-icon vertical-center" />Dernière mise à jour le {useDate(stuffDetails.majDate)} par {stuffDetails.majAuthor}</p>

            </div>
        </div>
    );
}

export default RessourceDetails;