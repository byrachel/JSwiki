import React, { useState, useEffect, useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import '../../App.scss';
import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

// Category icons
import { TiHeartFullOutline } from 'react-icons/ti';
import { WikiContext } from '../../context/WikiContext';
import { UserContext } from '../../context/UserContext';

let HEROKU_URL = config.url.HEROKU_URL;

export default function RessourcesByCategory(props) {

    const category = props.value;
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/api/${category}`);
    const [ search, setSearch ] = useState('');
    const [ filteredData, setFilteredData ] = useState(data);

    const { addLike } = useContext(WikiContext);
    const { userId } = useContext(UserContext);

    const handleLike = (id, like) => {
        addLike(id, like)
    }

    useEffect(() => {
        const searchResult = data.filter((result) => {
            return result.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(searchResult)
      }, [search, data]);

    return (
        <div className="container">
            <div className="light-card">

                <h3>> Wiki > {category}</h3>
                <div className="separator"></div>
                <br />

                <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Recherche..." />

            </div>

            {loading ? <div>Chargement en cours...</div> : null }
            {error ? <div>Une erreur s'est produite.</div> : null }

            <ul className="ressource-cards">
                {filteredData.map(d => 
                <li key={d._id}>
                    <div className="card">
                        <p className="vertical-center right meta"><TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(d._id, d.like)} />{d.like} { d.like <2 ? 'fan' : 'fans' }</p>
                        <h2>{d.title}</h2>
                        <p>{d.resum}</p>
                        <br />
                        <div className="ressource-cards center">
                            { userId != null ?
                            <Link to ={`/wikiedit/${d._id}`}><Button rounded className="meta-button">Mettre à jour</Button></Link>
                            :
                            <Link to ={`/createaccount`}><Button rounded className="meta-button">Mettre à jour</Button></Link>
                            }
                            <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger">Consulter la fiche</Button></Link>

                        </div>
                    </div>
                </li>)}
            </ul>


        </div>
    )
}