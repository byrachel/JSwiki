import React, { useContext, useState } from 'react';
import { TiHeartFullOutline, TiFlash, TiFlashOutline } from 'react-icons/ti';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr'
import { UserContext } from '../../context/UserContext';
import Login from '../User/Login';
import useRequest from '../../hooks/useRequest';
import Tag from 'react-bulma-components/lib/components/tag';
import { config } from '../../Constants';
let HEROKU_URL = config.url.HEROKU_URL;


const RessourceDetails = (props) => {

    const id = props.value;
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/${id}`);

    const { userId, addLike } = useContext(UserContext)
    const [show, setShow] = useState(false);

    moment.locale('fr');

    const handleLike = (id, like) => {
        addLike(id, like)
    }

    const setCategoryColor = (category) => {
        switch (category) {
            case 'Framework':
                return 'is-danger'
            case 'Librairie':
                return 'is-primary'
            case 'Software':
                return 'is-light'
            case 'Composant':
                return 'is-dark'
            case 'Autre':
                return 'is-info'
            default:
                return 'is-light'
        }
    }

    const LoginModal = ({ show, setShow }) => {
        const content = show && (
            <div className="overlay">
                <div className="dialog">
                    <div className="close-modal right" type="button" onClick={() => setShow(false)}>X</div>
                    <Login show={show} setShow={setShow} />
                </div>
            </div>
        )
        return content;
    }

    return (
        <div className="container">
            <div className="light-card">

                <h3>Wiki - Fiche détaillée</h3>
                <div className="separator"></div>
            </div>

            { loading ? <p>Chargement en cours...</p> :

                error ? <p> Une erreure s'est produite</p> :

                <div className="card-details">

                    <div className="right">
                        <Tag className={setCategoryColor(data.category)}>{data.category}</Tag>
                        <span className="vertical-center like-container"><TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(data._id, data.like)} />
                            {data.like} { data.like <2 ? 'fan' : 'fans' }
                        </span>
                    </div>
                    <h1 className="heading-ressource">{data.title}</h1>

                    <br />

                    <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    <br />

                    <p className="resum"><strong>En savoir plus : </strong><a href={data.link}>{data.link}</a></p>


                    <br />
                    <div className="separator"></div>
                    { userId != null ?
                    <Link to ={`/wikiedit/${id}`}><Button rounded className="button is-danger right is-small" outlined>Mettre à jour</Button></Link>
                    :
                    <Button rounded className="button is-danger right is-small" outlined onClick={() => setShow(true)} >Mettre à jour</Button>
                    }



                    <p className="meta-info"><TiFlash className="meta-icon vertical-center" /> Créé le {moment(data.date).format('LLLL')} par <Link to={`/useraccount/${data.authorId}`}>{data.author}</Link></p>
                    <p className="meta-info"><TiFlashOutline className="meta-icon vertical-center" />Mis à jour le {moment(data.majDate).format('LLLL')} par {data.majAuthor}</p>
                    <LoginModal show={show} setShow={setShow} />

                </div>
            }
        </div>
    );
}

export default RessourceDetails;
