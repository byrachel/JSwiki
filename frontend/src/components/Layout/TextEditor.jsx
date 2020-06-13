import React, {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TextEditor extends Component {
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    render() {
        return (
        <Editor
            apiKey='idfcao36zm119d142p5ohd71hczgjurc6wyxdqztp86181mr'
            cloudChannel='stable'
            initialValue="<p>Décrivez cette ressource avec le plus grand soin.</p>"
            init={{
            height: 500,
            menubar: false,
            // plugins: [
            //     'code codesample',
            //     'advlist autolink lists link image charmap print preview anchor',
            //     'searchreplace visualblocks code fullscreen',
            //     'insertdatetime media table paste code help wordcount',
                
            // ],
            plugins: "link image code",
            // toolbar:
            //     'undo redo | formatselect | bold italic backcolor | \
            //     codesample code  |  \
            //     bullist numlist outdent indent | removeformat | help',
            toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code'
            }}
            onEditorChange={this.handleEditorChange}
        />
        );
    }
    }

 export default TextEditor;