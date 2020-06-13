import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../context/UserContext';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Button from 'react-bulma-components/lib/components/button';

export default function LoginForm() {

    const { register, handleSubmit, errors } = useForm();
    const { loginUser, loginError, userId } = useContext(UserContext);
    const history = useHistory()

    const onSubmit = data => {
        loginUser(data)
    }

    useEffect(() => {
        const redirect = () => {
            if(userId != null) {
                history.push('/profile')
            }
        }
        redirect()      
    }, [userId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            { loginError ? <p className="error">Veuillez vérifier vos identifiants.</p> : null }
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
            <br />
            <div className="center">
                <Button color='danger' rounded className='big-button' type="submit">Me connecter</Button>
            </div>
            <br />
        </form>
    )
}