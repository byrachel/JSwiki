import axios from 'axios';
import { toast } from 'react-toastify'

axios.interceptors.response.use(
    
    function (response) {
        return response;
    },
    
    function(error) {
        const expectedError =
        error.response.status >= 400 &&
        error.response.status < 500;

        if(expectedError) {
            console.log(error.request);
            console.log(error.request.status)
            console.log(error.request.responseURL)

            toast("Une erreur est survenue");
            return ({
                    'status' :  error.request.status,
                    'URL' : error.request.responseURL        
                },
                Promise.reject(error)
            )
        }

        return Promise.reject(error)
    })

export default {
    get : axios.get,
    post : axios.post,
    put : axios.put,
    delete : axios.delete
}