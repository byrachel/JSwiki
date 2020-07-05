import React from 'react';
import '../App.scss';
import CategoriesList from 'components/Stuff/CategoriesList';
import { Helmet } from 'react-helmet';

export default function Home() {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>JS(wiki) : 1ère communauté de développeurs JS francophone.</title>
                <meta name="description" content="Tu es un développeur passionné de JavaScript ? Découvre et partage tes meilleures librairies et ressources JavaScript sur JS(wiki)." />
                <link rel="canonical" href="https://jswikitech.herokuapp.com/" />
            </Helmet>

            <div className="container">
                <h1 className="center">Ressources & astuces JavaScript</h1>
                <p className="slogan center">Participez à la création de JS(wiki) l'annuaire qui facilite la vie des développeurs.</p>
                <img src="/images/blog-javascript.png" alt="Blog de ressources pour développeurs" className="home-img" />
            </div>
            <div className="container-fluid fullwidth">
                <h2 className="center">Quel type de ressource cherchez-vous ?</h2>
                <br />
                <CategoriesList />
            </div>

        </>
    )
}
