import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import Profile from '../components/User/Profile';
import MyActions from '../components/User/MyActions';
import axios from 'axios';
import { config } from '../Constants';
import { useHistory } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';

let HEROKU_URL = config.url.HEROKU_URL;

export default function MyAccount() {

    const history = useHistory();

    const logout = () => {
        axios.get(`${HEROKU_URL}/auth/logout`)
        .then((res) => {
            localStorage.clear();
            history.push('/');
        })
    }

    return (
        <div className="light-card">
            <Columns>
                <Columns.Column size={4}>
                    <div className="login-container">
                        <img src="/images/webdesgin.png" alt="Développeur web" className="illustration" />
                    </div>
                </Columns.Column>
                <Columns.Column size={4}>
                    <Profile />
                </Columns.Column>
                <Columns.Column size={4}>
                    <MyActions />
                </Columns.Column>

            </Columns>
            <Button className="is-small" rounded onClick={() => logout()}>Logout</Button>
        </div>

    )
}
