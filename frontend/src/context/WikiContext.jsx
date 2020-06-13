import React, { createContext, useState } from 'react';
import axios from 'axios';
import { config } from '../Constants';

let HEROKU_URL = config.url.HEROKU_URL;

export const WikiContext = createContext();

export const WikiProvider = ({children}) => {

    const [ stuffDetails, setStuffDetails ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ stuffLikes, setStuffLikes ] = useState(null);
    const [ ressources, setRessources ] = useState([]);
    const [ update, setUpdate ] = useState(false);

    const createStuff = data => {
        axios.post(`${HEROKU_URL}/api/create`, data) 
        .then((res) => {console.log(res.data)})
        .catch((err) => {setError(err)})
    }

    const editStuff = (id, data, onSuccess, onResponse) => {
        axios.put(`${HEROKU_URL}/api/update/${id}`, data) 
        .then((res) => {onSuccess()})
        .catch((err) => {onResponse(err)})
    }

    const addLike = (id, like) => {
        const newLike = {
            like: like +1
        }
        axios.put(`${HEROKU_URL}/api/update/${id}`, newLike)
        .then((res) => setStuffLikes(+1))
        .catch((err) => console.log(err))
    }

    const getRessourceDetails = id => {
        axios.get(`${HEROKU_URL}/api/${id}`)
        .then((res) => {setStuffDetails(res.data)
            setStuffLikes(res.data.like)})
        .catch((err) => console.log(error))
    }

    const getRessources = () => {
        axios.get(`${HEROKU_URL}/api/`)
        .then((res) => {setRessources(res.data)})
            .catch((err) => console.log(err))
    }

    const deleteRessource = id => {
        axios.delete(`${HEROKU_URL}/api/delete/${id}`)
        .then((res) => setUpdate(!update))
        .then((err) => console.log(err))
    }

    return(
        <WikiContext.Provider value={{
            error,
            stuffDetails,
            stuffLikes,
            createStuff,
            addLike,
            getRessourceDetails,
            deleteRessource,
            editStuff,
            ressources,
            getRessources,
            update
            }}>
            {children}
        </WikiContext.Provider>
    )
}

export const WikiConsumer = WikiContext.Consumer;
