import React, { useState, useEffect, useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import { Link } from 'react-router-dom';
import { TiHeartFullOutline } from 'react-icons/ti';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

// Category icons
import { TiCode, TiFolder, TiFlowChildren, TiPuzzle, TiLocationArrow } from 'react-icons/ti';
import { WikiContext } from '../../context/WikiContext';

export default function Ressources() {
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/`);
    const [ search, setSearch ] = useState('');
    const [ filteredData, setFilteredData ] = useState(data);

    const { addLike, stuffLikes, stuff } = useContext(WikiContext);

    const handleLike = (id, like) => {
        addLike(id, like)
    }

    const setCategoryIcon = (category) => {
        switch (category) {
            case 'Framework':
                return( <TiCode className="framework-category-icon" /> )
            case 'Librairie':
                return( <TiFolder className="library-category-icon" />)
            case 'Software':
                return( <TiLocationArrow className="software-category-icon" />)
            case 'Composant':
                return( <TiFlowChildren className="component-category-icon" />)
            case 'Autre':
                return( <TiPuzzle className="other-category-icon" />)
            default:
                return('')
        }
    }

    useEffect(() => {
        const searchResult = data.filter((result) => {
            return result.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(searchResult)
      }, [search, data, stuffLikes, stuff]);

    return (
        <div className="container">
            <div className="light-card">

                <h3>> Wiki </h3>
                <div className="separator"></div>
                <br />

                <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Recherche..." />

            </div>

            {loading ? <div>Loading...</div> : null }
            {error ? <div>Une erreur s'est produite.</div> : null }
            <ul className="ressource-cards">
                {filteredData.map(d => 
                <li key={d._id}>
                    <div className="card">
                        <p className="meta right"><TiHeartFullOutline className="like-icon vertical-center" onClick={() => handleLike(d._id, d.like)} />{d.like} { d.like <2 ? 'fan' : 'fans' }</p>
                        <h2>{d.title}</h2>
                        <p>{d.resum}</p>
                        <br />
                        <div className="ressource-cards center">
                            <Link to={`/wiki/${d.category}`}><Button rounded outlined className="meta-button">{setCategoryIcon(d.category)}{d.category}</Button></Link>
                            <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger">Lire la fiche</Button></Link>
                        </div>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}