import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';

export default function Login({ setShow }) {

    const { register, handleSubmit, errors } = useForm();
    const { loginUser } = useContext(UserContext);
    const history = useHistory()

    const closeModal = () => {
        setShow(false);
    }

    const onSubmit = data => {
        loginUser(data)
        closeModal()
    }

    const signup = () => {
        setShow(false)
        history.push("/createaccount")
    }

    const handlePassword = () => {
        setShow(false);
        history.push("/forgotpassword");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Se connecter</h2>
            <div className="separator"></div>
            <div>
                <label htmlFor="email">Email </label>
                <input type="email" className="text-input" name="email" ref={register({ required: true})} required />
                {errors.email && <span>Champ obligatoire.</span>}
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" className="text-input" name="password" ref={register({ required: true})} />
                {errors.password && <span>Champ obligatoire.</span>}
            </div>
            <div className="center">
                <p className="meta link" onClick={() => handlePassword()} >mot de passe oublié</p>
                <Button color='primary' rounded className='big-button' type="submit">Me connecter</Button>
            </div>
            <br />
            <div className="center">
                <p>Vous n'avez pas encore de compte ?</p>
                <p className="link" onClick={signup}>Créer un compte</p>
            </div>
        </form>
    )
}