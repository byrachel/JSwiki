import React, { useContext } from 'react';
import useRequest from '../../hooks/useRequest';
import '../../App.scss';
import { config } from '../../Constants';
import { UserContext } from '../../context/UserContext';
import RessourceContainer from './RessourceContainer';

let HEROKU_URL = config.url.HEROKU_URL;

export default function RessourcesByCategory(props) {

    const category = props.value;
    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/api/${category}`);

    const { isLogged } = useContext(UserContext);

    return (
        <div className="container">

            { loading ?

                error ?
                    <p>Les données ne sont pas accessibles pour le moment.</p>

                :

                    <p><br />Chargement en cours...</p>
            
            :

                <RessourceContainer data={data} isLogged={isLogged} />
            }

        </div>
    )
}