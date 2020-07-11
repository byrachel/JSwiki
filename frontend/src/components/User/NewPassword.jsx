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
                    <h2>Votre nouveau mot de passe est enregistré !</h2>
                    <p>Vous pouvez maintenant vous identifier et partager vos ressources avec les JSwikers.</p>
                    <br />
                    <div className="login-card">
                        <LoginForm />
                    </div>
                </div>
            :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">eMail :</label>
                    <input type="email" className="text-input" name="email" ref={register({ required: true, pattern : /^\S+@\S+\.\S+$/})} />
                    {errors.email && <p className="red">Veuillez vérifier votre adresse mail.</p>}   
                    <label htmlFor="password">Password :</label>
                    <input type="password" className="text-input" name="password" ref={register({ required: true, minLength: 7 })} />
                    {errors.password && <p className="red">Votre mot de passe doit contenir au moins 7 caractères.</p>}   
                    <Button color='danger' rounded className='big-button' type="submit">Nouveau mot de passe</Button>         
                </form>
            }
        </div>
    );
}

export default NewPassword;