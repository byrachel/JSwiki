import React, { useState, useEffect, useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import '../../App.scss';
import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';
import Tag from 'react-bulma-components/lib/components/tag';

// Category icons
import { TiHeartFullOutline } from 'react-icons/ti';
import { UserContext } from '../../context/UserContext';

let HEROKU_URL = config.url.HEROKU_URL;

export default function RessourcesByCategory(props) {

    const category = props.value;
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/api/${category}`);
    const [ search, setSearch ] = useState('');
    const [ filteredData, setFilteredData ] = useState(data);

    const { isLogged, addLike } = useContext(UserContext);

    const handleLike = (id, like) => {
        addLike(id, like)
    }

    useEffect(() => {
        const searchResult = data.filter((result) => {
            return result.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(searchResult)
      }, [search, data]);

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

                <h3> Catégorie : <Tag className={setCategoryColor(category)}>{category}</Tag></h3>
                <br />
            </div>

            {loading ? <div>Chargement en cours...</div> :
                error ? <div>Une erreur s'est produite. Aucun contenu n'est disponible pour le moment.</div> : 

                    <ul>
                        <div className="search-bar">
                            <input type="text" name="search" className="search-bar-border" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Recherche..." />
                        </div>
                        {filteredData.map(d => 
                        <li key={d._id}>
                            <div className="card">
                                <h2>{d.title}</h2>
                                <div className="separator"></div>

                                <p>{d.resum}</p>
                                <br />

                                <Link to={`/wikisheet/${d._id}`}><TiHeartFullOutline className="like-icon vertical-center" /><span className="meta">{d.like}</span></Link>

                                { isLogged ?
                                    <div className="right">
                                        <Link to ={`/wikiedit/${d._id}`}><Button rounded className="meta-button is-small margin-right">Mettre à jour</Button></Link>
                                        <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Lire la fiche</Button></Link>
                                    </div>
                                :
                                    <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Lire la fiche</Button></Link>
                                }

                            </div>
                        </li>)}
                    </ul>
            }
        </div>
    )
}