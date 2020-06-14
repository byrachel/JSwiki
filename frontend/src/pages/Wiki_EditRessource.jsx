import React from 'react';
import '../App.scss';
import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';
import { useParams } from 'react-router-dom';
import EditRessource from '../components/Stuff/EditRessource';

export default function Wiki_RessourceDetails() {

    const params = useParams();
    const ressourceId = params.id;

    return (
        <>

            <Columns>
                <Columns.Column size={8}>
                    <EditRessource value={ressourceId} />
                </Columns.Column>
                <Columns.Column size={4}>
                    <StuffSidebar />
                </Columns.Column>
            </Columns>

        </>
    )
}
