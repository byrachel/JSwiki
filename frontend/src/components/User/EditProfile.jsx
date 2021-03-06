import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';
import Button from 'react-bulma-components/lib/components/button';
import { TiTick } from "react-icons/ti";
import axios from 'axios';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const EditProfile = ({ editMode, setEditMode }) => {

    const { register, handleSubmit, errors } = useForm();
    const { user, userId } = useContext(UserContext);
    const [ updateError, setUpdateError ] = useState(false)

    const onSubmit = ( data) => {
        const user = {
            _id : userId,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            website: data.website,
            github: data.github,
            bio: data.bio
        }
        axios.put(`${HEROKU_URL}/auth/update/${userId}`, user, {withCredentials: true})
        .then((res) => {
            setEditMode(false)})
        .catch((err) => setUpdateError(true))
    }

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>

                { updateError ? <p className="red">Les données n'ont pu être mises à jour !</p> : null }

                <label htmlFor="email">Email </label>
                <input type="email" name="email" ref={register({required: true })} defaultValue={user.email} />
                {errors.email && <span>Champ obligatoire.</span>}

                <label htmlFor="firstname">Prénom</label>
                <input type="text" name="firstname" ref={register({ required: false })} defaultValue={user.firstname} />

                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" ref={register({ required: false })} defaultValue={user.lastname} />

                <label htmlFor="bio">Bio</label>
                <textarea name="bio" ref={register({ required: false })} defaultValue={user.bio} />

                <label htmlFor="website">Website</label>
                <input type="text" name="website" ref={register({ required: false })} defaultValue={user.website} />

                <label htmlFor="github">Github</label>
                <input type="text" name="github" ref={register({ required: false })} defaultValue={user.github} />

                <Button rounded onClick={() => setEditMode(false)}>Annuler</Button> <Button type="submit" color='danger' rounded><TiTick className="button-icon" />Mettre à jour</Button>

            </form>                                                                                                                                    

        </div>
    );
}

export default EditProfile;
