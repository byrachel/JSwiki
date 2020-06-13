import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [ userId, setUserId ] = useState(null);
    const [ userProfile, setUserProfile ] = useState([]); // mon compte
    const [ userAccount, setUserAccount ] = useState([]); // compte d'un autre user
    const [ redirect, setRedirect ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loginError, setLoginError ] = useState(null);

    const createUser = (data) => {
        const userData = {
            user: data
        }
        axios.post(`${HEROKU_URL}/auth/signup`, userData, {withCredentials: true}) 
        .then((res) => {setRedirect(true)})
        .catch((err) => {setError(true)})
    }

    const logout = () => {
        axios.get(`${HEROKU_URL}/auth/logout`)
        .then((res) => {
            setUserId(null);
            setUserProfile([]);})
    }

    const loginUser = (data) => {
        axios.post(`${HEROKU_URL}/auth/login`, data, {withCredentials: true})
        .then((res) => {
            setUserId(res.data.user._id)
            setRedirect(true)})
        .catch((err) => setLoginError(true))
    }

    const getUser = () => {
        axios.get(`${HEROKU_URL}/auth/myaccount`, {withCredentials: true})
        .then((res) => {
            console.log(res.data)
            setUserProfile(res.data)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUser()
        console.log(userProfile)        
    }, [userId]);

    const displayOneUser = id => {
        axios.get(`${HEROKU_URL}/auth/user/${id}`, {withCredentials: true})
        .then((res) => {
            console.log(res.data)
            setUserAccount(res.data)
        })
        .catch((err) => console.log(err))
    }

    const updateUser = (id, data) => {
        axios.put(`${HEROKU_URL}/auth/update/${id}`, data, {withCredentials: true})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => console.log(err))
    }

    return(
        <UserContext.Provider value={{
            userId,
            userProfile,
            getUser,
            createUser,
            loginUser,
            logout,
            updateUser,
            loginError,
            error,
            redirect,
            displayOneUser,
            userAccount
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;
