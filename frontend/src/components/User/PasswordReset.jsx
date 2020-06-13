import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;
const PasswordReset = () => {

    const { register, handleSubmit, errors } = useForm();
    const [ message, setMessage ] = useState(false);

    const onSubmit = (e, data) => {
        axios.post(`${HEROKU_URL}/auth/forgotpassword`, data)
        .then((res) => {
            e.target.reset();
            setMessage(true);
        })
        .catch((err) => console.log(err))
    }

    return (

        <div className="container">
            <div className="light-card">
                <h3>> Réinitialiser mon mot de passe :</h3>
                <div className="separator"></div>
                <br />

                { message ? 

                    <h2>hello</h2>
                
                : null}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Saisisez l'email identifiant votre compte :</label>
                    <input type="email" className="text-input" name="email" ref={register({ required: true})} />
                    {errors.email && <span>Champ obligatoire.</span>}   
                    <Button color='danger' rounded className='big-button' type="submit">Reinitialiser le mot de passe</Button>         
                </form>
            </div>
        </div>
    );
}

export default PasswordReset;