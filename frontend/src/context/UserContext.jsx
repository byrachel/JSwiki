import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [ userId, setUserId ] = useState(null);
    const [ redirect, setRedirect ] = useState(false);
    const [ stuffLikes, setStuffLikes ] = useState(null);
    const [ isLogged, setIsLogged ] = useState(false);
    const [ user, setUser ] = useState([]);

    const loginUser = (data, onSuccess, onResponse) => {
        axios.post(`${HEROKU_URL}/auth/login`, data, {withCredentials: true})
        .then((res) => {
            onSuccess();
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            sessionStorage.setItem('isLogged', true);
            sessionStorage.setItem('userId', JSON.stringify(res.data.user._id));
            setUserId(JSON.parse(sessionStorage.getItem('userId')))
            setUser(JSON.parse(sessionStorage.getItem('user')))
            setIsLogged(JSON.parse(sessionStorage.getItem('isLogged')))
            setRedirect(true);
        })
        .catch((err) => {
            onResponse();
        })
    }

    useEffect(() => {
        if(sessionStorage.length > 0) {
            setIsLogged(JSON.parse(sessionStorage.getItem('isLogged')))
            setUserId(JSON.parse(sessionStorage.getItem('userId')))
            setUser(JSON.parse(sessionStorage.getItem('user')))
        }
    }, []);

    const logout = () => {

        sessionStorage.clear();

        axios.get(`${HEROKU_URL}/auth/logout`)
        .then((res) => {
            setIsLogged(false)
            setUserId(null)
            setUser([])
        })
    }

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
            addLike,
            stuffLikes,
            setStuffLikes,
            loginUser,
            redirect,
            isLogged,
            logout,
            user
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;
