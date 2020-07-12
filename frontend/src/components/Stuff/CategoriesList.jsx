import React from 'react';
import { TiCode, TiFolder, TiFlowChildren, TiPuzzle, TiLocationArrow } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Tag from 'react-bulma-components/lib/components/tag';

const CategoriesList = () => {

    return (
        <div className="center">
            <Link to="/wiki/Framework"><Tag className="is-danger is-medium tag"><TiCode className="category-nav-icon" /> Frameworks</Tag></Link>
            <Link to="/wiki/Librairie"><Tag className="is-primary is-medium  tag"><TiFolder className="category-nav-icon" /> Librairies</Tag></Link>
            <Link to="/wiki/Composant"><Tag className="is-success is-medium  tag"><TiLocationArrow className="category-nav-icon" /> Composants</Tag></Link>
            <Link to="/wiki/Software"><Tag className="is-dark is-medium  tag"><TiFlowChildren className="category-nav-icon" /> Software</Tag></Link>
            <Link to="/wiki/Autre"><Tag className="is-warning is-medium  tag"><TiPuzzle className="category-nav-icon" /> Autre</Tag></Link>
            <br />
        </div>
    );
}

export default CategoriesList;
