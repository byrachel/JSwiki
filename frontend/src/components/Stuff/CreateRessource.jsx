import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { WikiContext } from '../../context/WikiContext';
import { UserContext } from '../../context/UserContext';
import { Editor } from '@tinymce/tinymce-react';

function CreateRessource() {

    const { createStuff } = useContext(WikiContext);
    const { userProfile } = useContext(UserContext);
    const [ contentRessource, setContentRessource ] = useState('Décrivez votre ressource avec le plus grand soin.')
    const { register, handleSubmit, errors } = useForm();
    const categories = ['Framework', 'Librairie', 'Composant', 'Software', 'Autre'];
    const today = new Date();

    const onSubmit = data => {
        const stuffData = {
            author: `${userProfile.firstname} ${userProfile.lastname}`,
            authorId: `${userProfile._id}`,
            date: today,
            content: contentRessource,
            ...data
        }
        createStuff(stuffData)
    };

    const handleEditorChange = (content, editor) => {
        setContentRessource(content)
    }

  return (

    <div className="light-card">

        <h3>> Wiki > Publier une ressource</h3>
        <div className="separator"></div>

        <br />
        <h2>Publier une nouvelle ressource :</h2>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} >

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
                    <strong>Titre</strong> (nom de la ressource) :
                    <input type="text" name="title" ref={register({ required: true, maxLength: 30 })}/>
                    <p className="error">{errors.title && "Le nom ne peut dépasser 30 caractères."}</p>
                </label>
            </div>

            <div className="form-item">
                <label htmlFor="resum">
                    <strong>Résumé</strong> (maximum 100 caractères) :
                    <input type="text" name="resum" ref={register({ required: true, maxLength: 100 })} />
                    <p className="error">{errors.resum && "Ce champ est obligatoire."}</p>
                </label>
            </div>

            <div className="form-item">
                <label htmlFor="content">
                {/* <TextEditor value={contentRessource} onEditorChange={() => setContentRessource(contentRessource)} /> */}
                    {/* <strong>Description</strong> (minimum 250 caractères) : */}
                    {/* <textarea name="content" ref={register({ required: true })} rows="20" cols="10" /> */}
                    {/* <p className="error">{errors.content && "Ce champ est obligatoire."}</p> */}
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
                            'fontsizeselect | bold | italic | link | code | codesample |  \
                            bullist numlist outdent indent | removeformat | undo redo help'
                        }}
                        onEditorChange={handleEditorChange}
                    />

                </label>
            </div>

            <div className="form-item">
                <label htmlFor="link">
                    <strong>Lien</strong> (url complète) :
                    <input type="text" name="link" ref={register}/>
                    <p className="error">{errors.link && "Ce champ est obligatoire."}</p>
                </label>
            </div>

            <input type="submit" className="button is-black is-fullwidth" />
        </form>

        <div className="blocs">
            <div className="columns is-mobile ">
                <div className="column red-square">
                    <h2 className="white right">Attention</h2>
                </div>
                <div className="column is-11">
                    <p>Tel wikipedia, JS(wiki) est ouvert à tout contributeur. Cependant, un minimum de sérieux est nécessaire afin de rendre l'outil pratique et utile pour tous.</p>
                    <p><strong>Trois recommandations avant de contribuer :</strong> </p>
                    <ol>
                        <li><p>Assurez-vous que la ressource n'est pas déjà enregistrée.</p></li>
                        <li><p>Ne copiez/collez pas un texte issu d'un autre site.</p></li>
                        <li><p>Rédigez en français tout en veillant à votre grammaire et orthographe.</p></li>
                    </ol>
                </div>
            </div>
        </div>

    </div>
  );
}

export default CreateRessource;