import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import { useForm } from "react-hook-form";
import { TiFlash } from "react-icons/ti";
import { useHistory } from "react-router-dom";

import Button from 'react-bulma-components/lib/components/button';

export default function CreateUserAccount() {

    const { createUser, redirect, error } = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        const userData = {
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            website: data.website,
            github: data.github,
            bio: null
        }
        createUser(userData);
        if(redirect) {
            history.push('/')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="light-card">

            <h3>> Créer un compte </h3>
            <div className="separator"></div>
            <br />

            { error ? <p>Une erreur s'est produite, le compte n'a pu être créé.</p> : null}

            <label htmlFor="firstname">Prénom</label>
            <input type="text" name="firstname" ref={register({ required: true, minLength: 3 })} />
            {errors.firstname && <span>Merci d'indiquer votre prénom ou un pseudo.</span>}

            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" ref={register({ required: false })} />

            <label htmlFor="email">Email </label>
            <input type="email" name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/})}/>
            {errors.email && <span>Champ obligatoire.</span>}

            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" ref={register({ required: true, minLength: 7 })} />
            {errors.password && <span>Votre mot de passe doit contenir minimum 7 caractères.</span>}

            <label htmlFor="website">Website</label>
            <input type="text" name="website" ref={register({ required: false })} />

            <label htmlFor="Github">Github</label>
            <input type="text" name="github" ref={register({ required: false })} />

            <Button color='primary' rounded className='big-button' type="submit"><TiFlash className="button-icon" />Créer un compte</Button>

        </form>
    )
}