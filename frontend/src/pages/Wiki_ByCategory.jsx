import React from 'react';
import '../App.scss';
import Columns from 'react-bulma-components/lib/components/columns';
import StuffSidebar from '../components/Stuff/StuffSidebar';
import { useParams } from 'react-router-dom';
import RessourcesByCategory from '../components/Stuff/RessourcesByCategory';

export default function Wiki_ByCategory() {

    const params = useParams();
    const category = params.category;

    return (
        <>
            <Columns>
                <Columns.Column size={8}>
                    <RessourcesByCategory value={category} />
                </Columns.Column>
                <Columns.Column size={4}>
                    <StuffSidebar />
                </Columns.Column>
            </Columns>

        </>
    )
}
