import axios from 'axios';

const BASEURL = 'https://localhost:7182/api/';
const API = axios.create({
    baseURL: BASEURL,
})

export default API;