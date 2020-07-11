import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import EditProfile from './EditProfile';
import Button from 'react-bulma-components/lib/components/button';
import axios from 'axios';
import { config } from '../../Constants';
import { useHistory } from 'react-router-dom';

let HEROKU_URL = config.url.HEROKU_URL;

const Profile = () => {

    const { user } = useContext(UserContext);
    const [ editMode, setEditMode ] = useState(false);
    const history = useHistory();

    const logout = () => {
        axios.get(`${HEROKU_URL}/auth/logout`)
        .then((res) => {
            localStorage.clear();
            history.push('/');
        })
    }

    console.log(user)

    return (
        <div className="light-card">
            <h3>Mon compte </h3>
            <div className="separator"></div>

            { editMode ? <EditProfile editMode={editMode} setEditMode={setEditMode} /> :
                <>
                <h2>{user.firstname} {user.lastname}</h2>
                { user.bio ? <p>{user.bio}</p> : <p className="link" onClick={() => setEditMode(true)}>Ajouter votre bio</p> }
                <br />
                <p className="meta-maj">e-Mail : {user.email}</p>
                <p className="meta-maj">Github : {user.github}</p>
                <p className="meta-maj">Website : {user.website}</p>
                <br />
                <Button className="is-small" rounded onClick={() => logout()}>Logout</Button>
                <Button rounded className='big-button is-small is-danger' outlined onClick={() => setEditMode(true)}>Mettre à jour</Button>
                </>
            }       
            
        </div>
    );
}

export default Profile;
