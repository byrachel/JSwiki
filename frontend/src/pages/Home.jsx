import React from 'react';
import '../App.scss';
import CategoriesList from 'components/Stuff/CategoriesList';

export default function Home() {

    return (
        <>
            <div className="container-fluid">
                <h1 className="center">Ressources & astuces JavaScript</h1>
                <p className="slogan center">Participez à la création de JS(wiki) l'annuaire qui facilite la vie des développeurs.</p>
                <img src="/images/blog-javascript.png" alt="Blog de ressources pour développeurs"  className="home-img is-fluid" />
            </div>
            <div className="container-fluid fullwidth">
                <h2 className="center">Quel type de ressource cherchez-vous ?</h2>
                <br />
                <CategoriesList />
            </div>

        </>
    )
}
