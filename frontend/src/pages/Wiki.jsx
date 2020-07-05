import React from 'react';
import Ressources from 'components/Stuff/Ressources';
import '../App.scss';
import { Helmet } from 'react-helmet';

import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';

export default function Wiki() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>JS(wiki) : Annuaire de librairies et frameworks JavaScript.</title>
                <meta name="description" content="JS(wiki) est un site participatif de développeurs passionnés de JavaScript souhaite partager les librairies et ressources qu'ils utilisent au quotidien." />
                <link rel="canonical" href="https://jswikitech.herokuapp.com/wiki" />
            </Helmet>

            <Columns is-desktop>
                <Columns.Column size={8}>
                    <Ressources />
                </Columns.Column>
                <Columns.Column size={4}>
                    <StuffSidebar />
                </Columns.Column>
            </Columns>
        </>

    )
}
