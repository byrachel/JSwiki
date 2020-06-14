import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import Profile from '../components/User/Profile';
import MyActions from '../components/User/MyActions';

export default function MyAccount() {

    return (

        <Columns>
            <Columns.Column size={4}>
                <Profile />
            </Columns.Column>
            <Columns.Column size={4}>
                <br />
                <img src="/images/wiki-javascript.png" alt="Développeur web" />
            </Columns.Column>
            <Columns.Column size={4}>
                <MyActions />
            </Columns.Column>
        </Columns>

    )
}
