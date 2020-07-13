import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { config } from '../../Constants';
import { useHistory } from 'react-router-dom';
let HEROKU_URL = config.url.HEROKU_URL;

function CreateRessource() {

    const { user } = useContext(UserContext);
    const [ error, setError ] = useState(null);
    const [ contentRessource, setContentRessource ] = useState('Décrivez votre ressource avec le plus grand soin.')
    const { register, handleSubmit, errors } = useForm();
    const categories = ['Framework', 'Librairie', 'Composant', 'Software', 'Autre'];
    const today = new Date();

    const history = useHistory();

    const onSubmit = data => {
        const stuffData = {
            author: `${user.firstname} ${user.lastname}`,
            authorId: `${user._id}`,
            date: today,
            maj: false,
            content: contentRessource,
            ...data
        }
        axios.post(`${HEROKU_URL}/api/create`, stuffData, {withCredentials: true}) 
        .then((res) => {
            setError(false);
            redirect(res.data._id);
        })
        .catch((err) => {
            setError(err)})
    };

    const redirect = id => {
        history.push(`/wikisheet/${id}`)
    }

    const handleEditorChange = (content, editor) => {
        setContentRessource(content)
    }

  return (

    <div className="light-card">

        <h3>Wiki - Publier une ressource</h3>
        <div className="separator"></div>

        <br />
        <h2>Publier une nouvelle ressource :</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} >

            { error ? <p className="red">Une erreur est survenue. Le contenu n'a pu être enregistré.</p> : null}

            <div className="form-item">
                <label htmlFor="category">
                    <strong>Catégorie </strong>:
                    <select name="category" ref={register({ required: true })}>
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
                    <strong>Titre</strong> (nom de la ressource)* :
                    <input type="text" name="title" ref={register({ required: true, maxLength: 30 })}/>
                    <p className="error">{errors.title && "Le nom ne peut dépasser 30 caractères."}</p>
                </label>
            </div>

            <div className="form-item">
                <label htmlFor="resum">
                    <strong>Résumé</strong> (maximum 100 caractères)* :
                    <input type="text" name="resum" ref={register({ required: true, maxLength: 100 })} />
                    <p className="error">{errors.resum && "Ce champ est obligatoire."}</p>
                </label>
            </div>

            <div className="form-item">
                <label htmlFor="content">

                    <Editor
                        apiKey='idfcao36zm119d142p5ohd71hczgjurc6wyxdqztp86181mr'
                        cloudChannel='stable'
                        value={contentRessource}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code codesample fullscreen',
                            'insertdatetime media table paste help wordcount'
                        ],
                        toolbar:
                            'fontsizeselect | bold | italic | link | code | codesample | bullist numlist outdent indent | removeformat | undo redo'
                        }}
                        onEditorChange={handleEditorChange}
                        required
                    />

                </label>
            </div>

            <div className="form-item">
                <label htmlFor="link">
                    <strong>Lien</strong> (url complète)* :
                    <input type="text" name="link" ref={register}/>
                    <p className="error">{errors.link && "Ce champ est obligatoire."}</p>
                </label>
            </div>

            <input type="submit" className="button is-black is-fullwidth" />
        </form>

    </div>
  );
}

export default CreateRessource;