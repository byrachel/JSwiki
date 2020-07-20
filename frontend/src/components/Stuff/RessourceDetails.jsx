import React, { useContext, useState, useEffect } from 'react';
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
import SocialMedia from './SocialMedia';
import { Helmet } from 'react-helmet-async';

let HEROKU_URL = config.url.HEROKU_URL;

const RessourceDetails = (props) => {

    const id = props.value;
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/${id}`);
    moment.locale('fr');

    const { isLogged, addLike } = useContext(UserContext)
    const [show, setShow] = useState(false);

    const [ likes, setLikes ] = useState(0);

    useEffect(() => {
        setLikes(data.like)
    }, [data]);

    const handleLike = (id, like) => {
        setLikes(likes +1);
        addLike(id, like);
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
                return 'is-warning'
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
                <div className="right">
                    { isLogged ?
                    <Link to="/createressource"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    :
                    <Link to="/createaccount"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    }
                </div>
                <h3>Wiki - Fiche détaillée</h3>
            </div>

            { loading ? <p>Chargement en cours...</p> :

                error ? <p> Une erreure s'est produite</p> :

                <div className="card-details">
                    <Helmet>
                        <title>JS(wiki) : Les meilleures ressources JavaScript !</title>
                        <link rel="canonical" href="https://jswikitech.herokuapp.com/wikisheet/{data._id}" />
                        <meta name="description" content={data.resum} />
                    </Helmet>
                    <div className="right">
                        <Link to={`/wiki/${data.category}`}><Tag className={setCategoryColor(data.category)}>{data.category}</Tag></Link>
                    </div>
                    <h1 className="heading-ressource">{data.title}</h1>
                    <h2 className="meta">{data.resum}</h2>

                    <br />

                    <p dangerouslySetInnerHTML={{ __html: data.content }}></p>

                    <br />
                    <div className="separator"></div>

                    <p className="meta">Lien officiel : <a href={data.link}>{data.link}</a></p>
                    <br />
                    { isLogged ?
                        <Link to ={`/wikiedit/${id}`}><Button rounded className="button is-danger right is-small" outlined>Mettre à jour</Button></Link>
                    :
                        <Button rounded className="button is-danger right is-small" outlined onClick={() => setShow(true)} >Mettre à jour</Button>
                    }
                    <div className="sharebutton">
                        <SocialMedia shareUrl={`https://jswikitech.herokuapp.com/wikisheet/${data._id}`} name={data.title} summary={data.resum} />
                        <span className="like-container">
                            <TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(data._id, data.like)} />{likes}
                        </span>
                    </div>
                    <div className="author-space">

                        <div className="footer-card"></div>

                        <p className="meta-info"><TiFlash className="meta-icon vertical-center" /> Créé le {moment(data.date).format('LLLL')} par <Link to={`/useraccount/${data.authorId}`}>{data.author}</Link></p>
                        { data.maj ?
                            <p className="meta-info"><TiFlashOutline className="meta-icon vertical-center" />Mis à jour le {moment(data.majDate).format('LLLL')} par <Link to={`/useraccount/${data.authorId}`}>{data.majAuthor}</Link></p>
                        : null}
                    </div>
                    <LoginModal show={show} setShow={setShow} />

                </div>
            }
        </div>
    );
}

export default RessourceDetails;
