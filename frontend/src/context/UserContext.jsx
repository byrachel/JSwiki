import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [ userId, setUserId ] = useState(null);
    const [ userProfile, setUserProfile ] = useState([]); // mon compte
    const [ redirect, setRedirect ] = useState(false);
    const [ stuffLikes, setStuffLikes ] = useState(null);
    const [ myAccount, setMyAccount ] = useState([]);
    const [ isLogged, setIsLogged ] = useState(false);
    const [ cookie, setCookie ] = useState(false);

    const loginUser = (data, onSuccess, onResponse) => {
        axios.post(`${HEROKU_URL}/auth/login`, data, {withCredentials: true})
        .then((res) => {
            onSuccess();
            setUserId(res.data.user._id);
            setIsLogged(res.data.isLogged);
            setUserProfile(res.data.user);
            setMyAccount(res.data.user);
            setCookie(true);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setRedirect(true);
        })
        .catch((err) => {
            onResponse();
        })
    }

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if(cookie) {
            const user = JSON.parse(localStorage.getItem('user'));
            setMyAccount(user)
        }
    }, [cookie]);

    const addLike = (id, like) => {
        const newLike = {
            like: like +1
        }
        axios.put(`${HEROKU_URL}/api/like/${id}`, newLike)
        .then((res) => setStuffLikes(stuffLikes +1))
        .catch((err) => console.log(err))
    }

    return(
        <UserContext.Provider value={{
            userId,
            userProfile,
            addLike,
            stuffLikes,
            setStuffLikes,
            loginUser,
            redirect,
            myAccount,
            isLogged,
            cookie,
            setCookie,
            user
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;
