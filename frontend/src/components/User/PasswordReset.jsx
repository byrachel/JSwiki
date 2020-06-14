import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const PasswordReset = () => {

    const { register, handleSubmit, errors } = useForm();
    const [ message, setMessage ] = useState(false);

    const onSubmit = data => {
        axios.post(`${HEROKU_URL}/auth/forgotpassword`, data)
        .then((res) => setMessage(true))
        .catch((err) => console.log(err))
    }

    return (

        <div className="container">
            <div className="light-card">
                <h3>> Réinitialiser mon mot de passe :</h3>
                <div className="separator"></div>
                <br />

                { message ? 
                    <div>
                        <h2>Checkez votre boite mail !</h2>
                        <p>Si votre e-mail est enregistré dans la base de donnée JSwiki, un e-mail vous a été transmis et vous permettra de réinitialiser votre mot de passe. Sinon, créez un compte :)</p>
                        <p className="meta">Attention : le lien de réainitalisation est valable 20 minutes.</p>
                        <br />
                    </div>
                : null}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Saisisez l'email identifiant votre compte :</label>
                    <input type="email" className="text-input" name="email" ref={register({ required: true})} />
                    {errors.email ? <span className="meta">Champ obligatoire.</span> : <br />}
                    <Button color='danger' rounded className='big-button' type="submit">Reinitialiser le mot de passe</Button>         
                </form>
            </div>
        </div>
    );
}

export default PasswordReset;