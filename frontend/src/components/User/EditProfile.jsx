import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';
import Button from 'react-bulma-components/lib/components/button';
import { TiTick } from "react-icons/ti";


const EditProfile = ({ editMode, setEditMode }) => {

    const { register, handleSubmit, errors } = useForm();
    const { updateUser, userProfile, getUser, userId } = useContext(UserContext);

    const onSubmit = ( data) => {
        console.log(data)
        const user = {
            _id : userId,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            website: data.website,
            github: data.github,
            bio: data.bio
        }
        // console.log(user);
        updateUser(userId, user)
    }

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="email">Email </label>
                <input type="email" name="email" ref={register({required: true })} defaultValue={userProfile.email} />
                {errors.email && <span>Champ obligatoire.</span>}

                <label htmlFor="firstname">Prénom</label>
                <input type="text" name="firstname" ref={register({ required: false })} defaultValue={userProfile.firstname} />

                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" ref={register({ required: false })} defaultValue={userProfile.lastname} />

                <label htmlFor="bio">Bio</label>
                <textarea name="bio" ref={register({ required: false })} defaultValue={userProfile.bio} />

                <label htmlFor="website">Website</label>
                <input type="text" name="website" ref={register({ required: false })} defaultValue={userProfile.website} />

                <label htmlFor="github">Github</label>
                <input type="text" name="github" ref={register({ required: false })} defaultValue={userProfile.github} />

                <Button rounded onClick={() => setEditMode(false)}>Annuler</Button> <Button type="submit" color='danger' rounded><TiTick className="button-icon" />Mettre à jour</Button>

            </form>                                                                                                                                    

        </div>
    );
}

export default EditProfile;
