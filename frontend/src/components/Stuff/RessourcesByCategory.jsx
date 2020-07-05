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

    const { userId, addLike } = useContext(UserContext);

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
                                <div className="right">

                                </div>
                                <h2>{d.title}</h2>
                                <div className="separator"></div>

                                <p>{d.resum}</p>
                                { userId !== null ?
                                    <Link to ={`/wikiedit/${d._id}`}><Button rounded className="meta-button is-small">Mettre à jour</Button></Link>
                                    :
                                    null
                                }
                                <br />

                                <div className="right">

                                    <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Consulter la fiche</Button></Link>

                                </div>
                                <p className="vertical-center meta"><TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(d._id, d.like)} />{d.like} { d.like <2 ? 'fan' : 'fans' }</p>

                            </div>
                        </li>)}
                    </ul>
            }
        </div>
    )
}