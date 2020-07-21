import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TiBackspace } from 'react-icons/ti';

import { config } from '../../Constants';
let HEROKU_URL = config.url.HEROKU_URL;

const UsersList = () => {

    const [ users, setUsers ] = useState([]);
    const [ update, setUpdate ] = useState(false);

    useEffect(() => {
        axios.get(`${HEROKU_URL}/auth/users/all`, {withCredentials: true})
        .then((res) => setUsers(res.data.reverse()))
        .catch((err) => console.log(err))
    }, [update]);

    const removeUser = id => {
        axios.delete(`${HEROKU_URL}/auth/user/${id}`, {withCredentials: true})
        .then((res) => setUpdate(!update))
        .catch((err) => console.log(err))
    }

    return (
        <div className="light-card">
            { users.map((user) =>
            <li key={user._id}>{user.firstname} {user.lastname} - <span className="meta">{user.admin ? 'admin' : 'membre' } <TiBackspace className="suppr-user" onClick={() => removeUser(user._id)} /></span></li>
            )}
        </div>
    );
}

export default UsersList;
