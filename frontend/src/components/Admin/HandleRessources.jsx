import React, { useContext } from 'react';
import Table from '../../hooks/Table';
import '../../hooks/Table.scss';
import { useDate } from '../../hooks/useDate';
import { TiTrash, TiEyeOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../Constants';
import useRequest from '../../hooks/useRequest';
import { UserContext } from '../../context/UserContext';
let HEROKU_URL = config.url.HEROKU_URL;

const HandleRessources = () => {

    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/`);
    const { user } = useContext(UserContext);

    const removeRessource = (id) => {
        axios.delete(`${HEROKU_URL}/api/delete/${id}`, {withCredentials: true})
        .then((res) => console.log(res))
        .then((err) => console.log(err))
    }

    const columns = [
        {
            Header: "Nom",
            accessor: "title",
        },
        {
            Header: "Auteur",
            accessor: "author"
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: ({ cell: { value } }) => useDate(value)
        },
        {
            Header: "Mise à jour",
            accessor: "majDate",
            Cell: ({ cell: { value } }) => useDate(value)
        },
        {
            Header: "",
            accessor: "_id",
            Cell: ({ cell: { value } }) => 
                <div>
                    <Link to={`/wikisheet/${value}`}><TiEyeOutline /></Link> 
                    <TiTrash onClick={() => removeRessource(value)} />
                </div>
        }
    ]

    return (

        <>
        { user.admin ?
            <div className="light-card">
                <h3>Gérer les ressources</h3>
                <div className="separator"></div>

                { loading ? <p>Chargement en cours...</p> :
                    error ? <p>Une erreur est survenue. Aucune donnée n'est disponible pour le moment.</p> : 
                        <>
                            <h2>Nombre de ressources : {data.length +1}</h2>
                            <br />
                            <Table columns={columns} data={data} />
                        </>
                }
            </div>
        : <p>Vous n'avez pas accès à cette page.</p> }
        </>
    );
}

export default HandleRessources;
