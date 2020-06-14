import React from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import axios from'axios';
import Button from 'react-bulma-components/lib/components/button';
import { config } from '../../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

const NewPassword = () => {

    const { register, handleSubmit, errors } = useForm();
    const token = useParams();

    const onSubmit = data => {
        const newData = {
            email: data.email,
            password: data.password,
            resetPasswordToken: token.token
        }
        axios.put(`${HEROKU_URL}/auth/updatepassword`, newData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">eMail :</label>
            <input type="email" className="text-input" name="email" ref={register({ required: true})} />
            {errors.email && <span>Champ obligatoire.</span>}   
            <label htmlFor="password">Password :</label>
            <input type="password" className="text-input" name="password" ref={register({ required: true})} />
            {errors.password && <span>Champ obligatoire.</span>}   
            <Button color='danger' rounded className='big-button' type="submit">Nouveau mot de passe</Button>         
        </form>
    );
}

export default NewPassword;