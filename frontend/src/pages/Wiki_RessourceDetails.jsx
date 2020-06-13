import React from 'react';
import '../App.scss';
import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';
import { useParams } from 'react-router-dom';
import RessourceDetails from '../components/Stuff/RessourceDetails';

export default function Wiki_RessourceDetails() {

    const params = useParams();
    const ressourceId = params.id;

    return (

            <Columns breakpoint="mobile">
                <Columns.Column size={8}>
                    <RessourceDetails value={ressourceId} />
                </Columns.Column>
                <Columns.Column size={4}>
                    <StuffSidebar />
                </Columns.Column>
            </Columns>

    )
}
