import React from 'react';
import '../App.scss';
import CategoriesList from 'components/Stuff/CategoriesList';
import { Link } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';

export default function Home() {

    return (
        <>
            <div className="container-fluid">
                <h1 className="center">Ressources & astuces JavaScript</h1>
                <p className="slogan center">Participez à la création de JS(wiki) l'annuaire qui facilite la vie des développeurs.</p>
                <img src="/images/blog-javascript.png" alt="Blog de ressources pour développeurs"  className="home-img is-fluid" />
            </div>
            <div className="container-fluid fullwidth center">
                <h2>Quel type de ressource cherchez-vous ?</h2>
                <br />
                <CategoriesList />
            </div>

            <div className="centered-container">
                <h2 className="center">Devenez JSwiker !</h2>
                <h3 className="center">Tel wikipedia, JS(wiki) est ouvert à tout contributeur.</h3>
                <br />
                    <div className="ordered-list center">
                        <p><strong>Trois recommandations avant de contribuer :</strong> </p>
                        <p>Assurez-vous que la ressource n'est pas déjà enregistrée.</p>
                        <p>Ne copiez/collez pas un texte issu d'un autre site.</p>
                        <p>Rédigez en français tout en veillant à votre grammaire et orthographe.</p>
                    </div>
                <br />
                <div className="center">
                    <Link to="/createaccount"><Button rounded className="button is-primary">Créer un compte</Button></Link>
                </div>
                <br />
            </div>

        </>
    )
}
