import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { TiFlash } from "react-icons/ti";
import axios from 'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export default function CreateUserAccount() {

    const { register, handleSubmit, errors } = useForm();
    const [ error, setError ] = useState(false);
    const [ newUser, setNewUser ] = useState(false);

    const onSubmit = (data, e)=> {
        e.target.reset();
        const userData = {
            user : {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                website: data.website,
                github: data.github,
                bio: null
            }
        }
        axios.post(`${HEROKU_URL}/auth/signup`, userData, {withCredentials: true}) 
        .then((res) => {
            setError(false);
            setNewUser(true);
        })
        .catch((err) => setError(true))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="light-card">

            <h3>Créer un compte </h3>
            <div className="separator"></div>
            <p><strong>Faîtes partie des JSwikers !</strong></p>
            <p>En créant un compte vous pourrez créer des ressources et mettre à jour toutes celles existantes.</p>
            <br />

            { newUser ?
                <div>
                    <h2><strong>Merci de votre inscription !</strong></h2>
                    <p className="red">Vous pouvez maintenant vous connecter et partager vos ressources avec la communauté des JSwikers.</p>
                    <br />
                </div>
            
            : null }

            { error ? <p><strong>Le compte n'a pas été créé. Veuillez vérifier vos données ou essayer ultérieurement. <br /></strong></p> : null}

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