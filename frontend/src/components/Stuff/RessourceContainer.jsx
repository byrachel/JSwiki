import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TiHeartFullOutline } from 'react-icons/ti';
import Button from 'react-bulma-components/lib/components/button';
import Tag from 'react-bulma-components/lib/components/tag';
import SocialMedia from './SocialMedia';
import CategoryColor from '../../utils/CategoryColor';

export default function Ressources({ data, isLogged }) {

    const [ search, setSearch ] = useState('');
    const [ filteredData, setFilteredData ] = useState(data);

    useEffect(() => {
        const searchResult = data.filter((result) => {
            return result.title.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredData(searchResult);
      }, [search, data]);

    return (
        <>
            <div className="light-card">
                <div className="right">
                    { isLogged ?
                    <Link to="/createressource"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    :
                    <Link to="/createaccount"><Button outlined rounded className="button is-primary is-small">Ajouter une ressource</Button></Link>
                    }
                </div>
                <h3>Annuaire de ressources JavaScript</h3>
            </div>
            <ul>
                <div className="search-bar">
                    <input type="text" name="search" className="search-bar-border" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Recherche..." />
                </div>

                {filteredData.map(d => 
                <li key={d._id}>
                    <div className="card">
                        <div className="right">
                        <Link to={`/wiki/${d.category}`}><Tag className={CategoryColor(d.category)}>{d.category}</Tag></Link>

                        </div>

                        <Link to={`/wikisheet/${d._id}`}><h2>{d.title}</h2></Link>
                        <div className="separator"></div>
                        <p>{d.resum}</p>
                        <br />


                        { isLogged ?
                            <div className="right">
                                <Link to ={`/wikiedit/${d._id}`}><Button rounded className="meta-button is-small margin-right">Mettre à jour</Button></Link>
                                <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Lire la fiche</Button></Link>
                            </div>
                        :
                            <div className="right">
                                <Link to={`/wikisheet/${d._id}`}><Button rounded outlined className="meta-button is-danger is-small">Lire la fiche</Button></Link>
                            </div>
                        }

                        <div className="sharebutton">
                            <SocialMedia shareUrl={`https://jswikitech.herokuapp.com/wikisheet/${d._id}`} name={d.title} summary={d.resum} />
                            <span className="like-container">
                                <Link to={`/wikisheet/${d._id}`}><TiHeartFullOutline className="like-icon vertical-center" /><span className="meta">{d.like}</span></Link>
                            </span>
                        </div>

                    </div>
                </li>)}
            </ul>
        </>
    )
}