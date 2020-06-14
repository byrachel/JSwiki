import React from 'react';
import '../App.scss';
import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';
import CreateRessource from '../components/Stuff/CreateRessource';

export default function Wiki_ByCategory() {


    return (

            <Columns>
                <Columns.Column size={8}>
                    <CreateRessource />
                </Columns.Column>
                <Columns.Column size={4}>
                    <StuffSidebar />
                </Columns.Column>
            </Columns>

    )
}
