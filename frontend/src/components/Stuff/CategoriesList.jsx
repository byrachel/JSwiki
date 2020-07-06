import React from 'react';
import { TiCode, TiFolder, TiFlowChildren, TiPuzzle, TiLocationArrow } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Tag from 'react-bulma-components/lib/components/tag';

const CategoriesList = () => {

    return (
        <>
            <Link to="/wiki/Framework"><Tag className="is-danger is-light tag"><TiCode className="category-nav-icon" /> Frameworks</Tag></Link>
            <Link to="/wiki/Librairie"><Tag className="is-primary is-light  tag"><TiFolder className="category-nav-icon" /> Librairies</Tag></Link>
            <Link to="/wiki/Composant"><Tag className="is-success is-light tag"><TiLocationArrow className="category-nav-icon" /> Composants</Tag></Link>
            <Link to="/wiki/Software"><Tag className="is-light tag"><TiFlowChildren className="category-nav-icon" /> Software</Tag></Link>
            <Link to="/wiki/Autre"><Tag className="is-warning is-light tag"><TiPuzzle className="category-nav-icon" /> Autre</Tag></Link>
            <br />
        </>
    );
}

export default CategoriesList;
