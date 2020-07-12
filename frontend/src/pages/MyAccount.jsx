import React, { useContext, useEffect, useState } from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import Profile from '../components/User/Profile';
import MyActions from '../components/User/MyActions';
import Button from 'react-bulma-components/lib/components/button';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

export default function MyAccount() {

    const { logout } = useContext(UserContext);
    const [ isLogout, setIsLogout ] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(isLogout) {
            history.push('/');
        }
    // eslint-disable-next-line      
    }, [isLogout]);

    const handleLogout = () => {
        logout();
        setIsLogout(true);
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
            <Button className="is-small" rounded onClick={() => handleLogout()}>Logout</Button>
        </div>

    )
}
