import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const PasswordReset = () => {

    const { register, handleSubmit, errors } = useForm();
    const [ message, setMessage ] = useState(false);
    const [ error, setError ] = useState(false);

    const onSubmit = (data, e) => {
        axios.post(`${HEROKU_URL}/auth/forgotpassword`, data)
        .then((res) => {
            setError(false);
            setMessage(true);
        })
        .catch((err) => {
            setError(true);
        })
    }

    return (

        <div className="container">
            <div className="light-card">
                <h3>Réinitialiser mon mot de passe :</h3>
                <div className="separator"></div>
                { error ?
                     <p className="red">Veuillez vérifier votre adresse mail.</p>
                :
                    <br />
                }

                { message ? 
                    <div>
                        <h2>Checkez votre boite mail !</h2>
                        <p>Si votre e-mail est enregistré dans la base de donnée JSwiki, un e-mail vous a été transmis et vous permettra de réinitialiser votre mot de passe. Sinon, créez un compte :)</p>
                        <br />
                        <p className="red">Attention : le lien de réainitalisation est valable 20 minutes.</p>
                    </div>
                :

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Saisisez l'email identifiant votre compte :</label>
                        <input type="email" className="text-input" name="email" ref={register({ required: true, pattern : /^\S+@\S+\.\S+$/})} />
                        {errors.email ? <span className="red">Veuilez vérifier votre adresse mail.</span> : <br />}
                        <Button color='danger' rounded className='big-button' type="submit">Reinitialiser le mot de passe</Button>         
                    </form>
                }
            </div>
        </div>
    );
}

export default PasswordReset;