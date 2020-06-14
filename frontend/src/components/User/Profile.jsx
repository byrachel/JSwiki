import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import EditProfile from './EditProfile';
import { TiArrowRepeat } from "react-icons/ti";
import Button from 'react-bulma-components/lib/components/button';

const Profile = () => {

    const { userProfile, logout } = useContext(UserContext);
    const [ editMode, setEditMode ] = useState(false)

    return (
        <div className="light-card">
            <h3>> Mon compte </h3>
            <div className="separator"></div>

            { editMode ? <EditProfile editMode={editMode} setEditMode={setEditMode} /> :
                <>
                <h2>{userProfile.firstname} {userProfile.lastname}</h2>
                { userProfile.bio ? <p>{userProfile.bio}</p> : <p className="link" onClick={() => setEditMode(true)}>Ajouter votre bio</p> }
                <br />
                <p className="meta-maj">e-Mail : {userProfile.email}</p>
                <p className="meta-maj">Github : {userProfile.github}</p>
                <p className="meta-maj">Website : {userProfile.website}</p>
                <br />
                <Button rounded onClick={() => logout()}><p>Logout</p></Button>
                <Button color='danger' rounded className='big-button' outlined onClick={() => setEditMode(true)}><TiArrowRepeat className="button-icon" /><p>Mettre à jour</p></Button>
                </>
            }       
            
        </div>
    );
}

export default Profile;
