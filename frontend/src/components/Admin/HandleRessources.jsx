import React, { useContext, useEffect } from 'react';
import Table from '../../hooks/Table';
import '../../hooks/Table.scss';
import { useDate } from '../../hooks/useDate';
import { TiTrash, TiEyeOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../Constants';
import useRequest from '../../hooks/useRequest';
let HEROKU_URL = config.url.HEROKU_URL;

const HandleRessources = () => {

    const { data, loading, error } = useRequest(`${HEROKU_URL}/api/`);

    const removeRessource = (id) => {
        axios.delete(`${HEROKU_URL}/api/delete/${id}`)
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
        <div className="light-card">
            { data.length > 0 ?
            <>
                <h3>Gérer les ressources</h3>
                <div className="separator"></div>
                <br />
                <h2>Nombre de ressources : {data.length +1}</h2>
                <br />
                <Table columns={columns} data={data} />
            </>
            : <p>Aucun élément disponible pour le moment.</p>}
        </div>
    );
}

export default HandleRessources;
