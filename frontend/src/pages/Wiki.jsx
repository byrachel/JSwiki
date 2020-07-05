import React from 'react';
import Ressources from 'components/Stuff/Ressources';
import '../App.scss';

import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';

export default function Wiki() {
    return (
        <>

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
