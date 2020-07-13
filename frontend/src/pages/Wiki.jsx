import React from 'react';
import Ressources from 'components/Stuff/Ressources';
import '../App.scss';
import { Helmet } from 'react-helmet-async';

import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';

export default function Wiki() {
    return (
        <>
            <Helmet>
                <title>JS(wiki) : Ressources JavaScript</title>
                <link rel="canonical" href="https://jswikitech.herokuapp.com/wiki" />
                <meta name="description" content="Annuaire des meilleures librairies, frameworks & modules JavaScript." />
            </Helmet>

            <Columns>
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
