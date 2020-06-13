import React from 'react';
import { useForm } from "react-hook-form";
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;
const PasswordReset = () => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        axios.post(`${HEROKU_URL}/auth/forgotpassword`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email </label>
            <input type="email" className="text-input" name="email" ref={register({ required: true})} />
            {errors.email && <span>Champ obligatoire.</span>}   
            <Button color='danger' rounded className='big-button' type="submit">Reinitialiser le mot de passe</Button>         
        </form>
    );
}

export default PasswordReset;