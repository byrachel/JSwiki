import React, { useContext, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { config } from '../../Constants';
import { UserContext } from '../../context/UserContext';
import RessourceContainer from './RessourceContainer';
import Pagination from '../../utils/Pagination';

let HEROKU_URL = config.url.HEROKU_URL;

export default function Ressources() {

    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/`);
    const { isLogged } = useContext(UserContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.reverse().slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (

        <div className="container">

            { loading ?

                error ?
                    <p>Les données ne sont pas accessibles pour le moment.</p>

                :

                    <p><br />Chargement en cours...</p>
            
            :
            <>
                <RessourceContainer data={currentPosts} isLogged={isLogged} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </>
            }

        </div>
        
    )
}