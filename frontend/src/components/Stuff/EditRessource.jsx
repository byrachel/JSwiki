import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';
import { config } from '../../Constants';
let HEROKU_URL = config.url.HEROKU_URL;

function EditRessource(props) {

    const id = props.value;

    const [ errorEdit, setErrorEdit ] = useState(null);
    const { data, loading } = useRequest(`${HEROKU_URL}/api/${id}`);
    const [ contentRessource, setContentRessource ] = useState(data.content)

    const { user } = useContext(UserContext);
    const today = new Date();
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();
    const categories = ['Framework', 'Librairie', 'Composant', 'Software', 'Autre']

    const onSubmit = data => {
        const stuffData = {
            majAuthor : `${user.firstname} ${user.lastname}`,
            majDate : today,
            maj: true,
            content: contentRessource,
            ...data
        }
            axios.put(`${HEROKU_URL}/api/update/${id}`, stuffData, {withCredentials:true}) 
            .then((res) => history.push(`/wikisheet/${id}`))
            .catch((err) => setErrorEdit("Une erreur s'est produite."))
    };

    const handleEditorChange = (content, editor) => {
        if(content !== contentRessource) {
            setContentRessource(content)
        }    
    }

  return (

    <div className="light-card">

        <h3> Wiki - Publier une ressource</h3>
        <div className="separator"></div>
        <br />
        <h2>Publier une nouvelle ressource :</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} >

            { errorEdit ? <h2>{errorEdit}</h2> : null }

            { loading ? <p>Chargement en cours...</p> :
            <>
                <div className="form-item">
                    <label htmlFor="category">
                        <strong>Catégorie </strong>:
                        <select name="category" ref={register({ required: true })} defaultValue={data.category}>
                            <option>Sélectionnez une catégorie</option>
                            {categories.map((category, index) =>
                            <option key={index} value={category}>{category}</option>
                            )}
                        </select>
                        <p className="error">{errors.category && "Veuillez sélectionner une catégorie."}</p>

                    </label>
                </div>

                <div className="form-item">
                    <label htmlFor="title">
                        <strong>Titre</strong> (nom de la ressource) :
                        <input type="text" name="title" ref={register({ required: true, maxLength: 30 })} defaultValue={data.title} />
                        <p className="error">{errors.title && "Le nom ne peut dépasser 30 caractères."}</p>
                    </label>
                </div>

                <div className="form-item">
                    <label htmlFor="resum">
                        <strong>Résumé</strong> (maximum 100 caractères) :
                        <input type="text" name="resum" ref={register({ required: true, maxLength: 100 })} defaultValue={data.resum} />
                        <p className="error">{errors.resum && "Ce champ est obligatoire."}</p>
                    </label>
                </div>

                <Editor
                    apiKey='idfcao36zm119d142p5ohd71hczgjurc6wyxdqztp86181mr'
                    cloudChannel='stable'
                    initialValue={data.content}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code codesample fullscreen',
                        'insertdatetime media table paste help wordcount'
                    ],
                    toolbar:
                        'fontsizeselect | bold | italic | link | code | codesample | bullist numlist outdent indent | removeformat | undo redo help'
                    }}
                    onEditorChange={handleEditorChange}
                />

                <div className="form-item">
                    <label htmlFor="link">
                        <strong>Lien</strong> (url complète) :
                        <input type="text" name="link" ref={register} defaultValue={data.link}/>
                        <p className="error">{errors.link && "Ce champ est obligatoire."}</p>
                    </label>
                </div>

                <button type="submit" className="button is-black is-fullwidth">Mettre à jour</button>
                </>
            }
        </form>
    </div>
  );
}

export default EditRessource;