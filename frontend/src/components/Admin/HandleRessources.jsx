import React, { useContext, useState, useEffect } from 'react';
import Table from '../../hooks/Table';
import '../../hooks/Table.scss';
import { useDate } from '../../hooks/useDate';
import Chart from './Chart';
import { TiBackspace } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../Constants';
import { UserContext } from '../../context/UserContext';
import Columns from 'react-bulma-components/lib/components/columns';
import UsersList from './UsersList';

let HEROKU_URL = config.url.HEROKU_URL;

const HandleRessources = () => {

    const { user } = useContext(UserContext);

    const [ update, setUpdate ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        axios.get(`${HEROKU_URL}/api/`, {withCredentials: true})
        .then((res) => {
            setError(false)
            setData(res.data)})
        .catch((err) => setError(true))
      }, [update]);

    const removeRessource = (id) => {
        axios.delete(`${HEROKU_URL}/api/delete/${id}`, {withCredentials: true})
        .then((res) => setUpdate(!update))
        .catch((err) => console.log(err))
    }

    const columns = [
        {
            Header: "Nom",
            accessor: "title",
            Cell: ({ cell: { value } }) => <Link to={`/wikisheet/${value}`}>{value}</Link> 
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
            Header: "Catégorie",
            accessor: "category"
        },
        {
            Header: "",
            accessor: "_id",
            Cell: ({ cell: { value } }) => <TiBackspace className="admin-icon" onClick={() => removeRessource(value)} />
        }
    ]

    return (
        <>
        { user.admin ?
            <div className="light-card">
                <h3>Gérer les ressources</h3>
                <div className="separator"></div>
                <Columns>
                    <Columns.Column size={8}>
                        <h3><strong>Répartition des ressources :</strong></h3>
                        <br />
                        <Chart stuff={data} />
                        <h3>Nombre de ressources : {data.length +1}</h3>

                    </Columns.Column>
                    <Columns.Column size={4}>
                        <h3><strong>Liste des JSwikers :</strong></h3>
                        <UsersList />
                    </Columns.Column>
                    <Columns.Column size={12}>
                        { error ?
                            <p>Une erreur est survenue. Aucune donnée n'est disponible pour le moment.</p>
                        : 
                            <Table columns={columns} data={data} />
                        }
                    </Columns.Column>
                </Columns>


            </div>
        : <p>Vous n'avez pas accès à cette page.</p> }
        </>
    );
}

export default HandleRessources;
