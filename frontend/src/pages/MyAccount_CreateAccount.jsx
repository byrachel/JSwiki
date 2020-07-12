import React from 'react';
import '../App.scss';

import Columns from 'react-bulma-components/lib/components/columns';
import CreateUserAccount from '../components/User/CreateUserAccount';
import LoginForm from '../components/User/LoginForm';

export default function MyAccount_CreateAccount() {
    return (

            <Columns>
                <Columns.Column size={8}>
                    <CreateUserAccount />
                </Columns.Column>
                <Columns.Column size={4}>
                    <LoginForm />
                </Columns.Column>
            </Columns>

    )
}
