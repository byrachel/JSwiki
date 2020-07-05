import React from 'react';
import { TiCode, TiFolder, TiFlowChildren, TiPuzzle, TiLocationArrow } from 'react-icons/ti';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';

const CategoriesList = () => {

    return (
        <div className="buttons-sidebar buttons is-centered">
            <Link to="/wiki/Framework"><Button rounded className="button is-danger is-small" ><TiCode className="category-nav-icon" /> Frameworks</Button></Link>
            <Link to="/wiki/Librairie"><Button rounded className="button is-info is-small" ><TiFolder className="category-nav-icon" /> Librairies</Button></Link>
            <Link to="/wiki/Composant"><Button rounded className="button is-warning is-small" ><TiLocationArrow className="category-nav-icon" /> Composants</Button></Link>
            <Link to="/wiki/Software"><Button rounded className="button is-success is-small" ><TiFlowChildren className="category-nav-icon" /> Software</Button></Link>
            <Link to="/wiki/Autre"><Button rounded className="button is-black is-small" ><TiPuzzle className="category-nav-icon" /> Autre</Button></Link>
            <Link to="/wiki/"><Button rounded className="button is-primary is-small" > Toutes catégories</Button></Link>
        </div>
    );
}

export default CategoriesList;
