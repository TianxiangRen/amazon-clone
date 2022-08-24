import axios from "axios"

const instance = axios.create({
    baseURL: 'https://us-central1-clone-cca72.cloudfunctions.net/api',
})

export default instance; 