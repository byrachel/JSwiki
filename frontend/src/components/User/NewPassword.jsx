import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';
import LoginForm from './LoginForm';

let HEROKU_URL = config.url.HEROKU_URL;

const NewPassword = () => {

    const { register, handleSubmit, errors } = useForm();
    const token = useParams();
    const [ message, setMessage ] = useState(false);

    const onSubmit = data => {
        const newData = {
            email: data.email,
            password: data.password,
            resetPasswordToken: token.token
        }
        axios.put(`${HEROKU_URL}/auth/updatepassword`, newData)
        .then((res) => {
            setMessage(true)
        })
        .catch((err) => setMessage(false))
    }

    return (
        <div className="container">
            <br />

            <h3>Réinitialisation de votre mot de passe</h3>
            <div className="separator"></div>
            { message ?
                <div className='center'>
                    <div className="login-card">

                    <h2>Votre nouveau mot de passe est enregistré </h2>
                    <p>Vous pouvez maintenant vous identifier et partager vos ressources avec les JSwikers.</p>
                    <br />
                        <LoginForm />
                    </div>
                </div>
            :
                <div className="login-card center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Saisissez votre eMail :</label>
                        <input type="email" className="text-input" name="email" ref={register({ required: true, pattern : /^\S+@\S+\.\S+$/})} />
                        {errors.email && <p className="red">Veuillez vérifier votre adresse mail.</p>}   
                        <label htmlFor="password">Saisissez votre nouveau mot de passe :</label>
                        <input type="password" className="text-input" name="password" ref={register({ required: true, minLength: 7 })} />
                        {errors.password && <p className="red">Votre mot de passe doit contenir au moins 7 caractères.</p>}   
                        <Button rounded className='big-button is-danger is-small' type="submit">Nouveau mot de passe</Button>         
                    </form>
                </div>
            }
        </div>
    );
}

export default NewPassword;