import React, { useContext, useEffect } from 'react';
import Table from '../../hooks/Table';
import '../../hooks/Table.scss';
import { useDate } from '../../hooks/useDate';
import { WikiContext } from '../../context/WikiContext';
import { TiTrash, TiEyeOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const HandleRessources = () => {

    const { getRessources, ressources, deleteRessource, update } = useContext(WikiContext);

    useEffect(() => {
        getRessources()
    }, [update]);

    const removeRessource = (id) => {
        deleteRessource(id)
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
            { ressources.length > 0 ?
            <>
                <h3>Gérer les ressources</h3>
                <div className="separator"></div>
                <br />
                <h2>Nombre de ressources : {ressources.length +1}</h2>
                <br />
                <Table columns={columns} data={ressources} />
            </>
            : <p>Aucun élément disponible pour le moment.</p>}
        </div>
    );
}

export default HandleRessources;
