import React, { useState, useEffect, useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { TiHeartFullOutline } from 'react-icons/ti';
import Button from 'react-bulma-components/lib/components/button';
import Tag from 'react-bulma-components/lib/components/tag';
import { config } from '../../Constants';
import { UserContext } from '../../context/UserContext';

let HEROKU_URL = config.url.HEROKU_URL;

export default function Ressources() {

    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/`);
    const [ search, setSearch ] = useState('');
    const [ filteredData, setFilteredData ] = useState(data);
    const { userId } = useContext(UserContext);

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

    useEffect(() => {
        const searchResult = data.filter((result) => {
            return result.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(searchResult);
      }, [search, data]);

    return (
        <div className="container">
            <div className="light-card">
                <div className="right">
                    { userId != null ?
                    <Link to="/createressource"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    :
                    <Link to="/createaccount"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    }
                </div>
                <h3>Annuaire de ressources JavaScript</h3>
            </div>

            {loading ? <div>Chargement en cours...</div> : null }
            
            {error ? <div>Une erreur s'est produite.</div> : null }

            <ul>

                <div className="search-bar">
                    <input type="text" name="search" className="search-bar-border" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Recherche..." />
                </div>

                {filteredData.reverse().map(d => 
                <li key={d._id}>
                    <div className="card">
                        <div className="right">
                        <Link to={`/wiki/${d.category}`}><Tag className={setCategoryColor(d.category)}>{d.category}</Tag></Link>

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
                            <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Lire la fiche</Button></Link>
                        </div>
                        <Link to={`/wikisheet/${d._id}`}><p className="meta"><TiHeartFullOutline className="like-icon vertical-center" />{d.like} { d.like <2 ? 'fan' : 'fans' }</p></Link>

                    </div>
                </li>)}
            </ul>
        </div>
    )
}