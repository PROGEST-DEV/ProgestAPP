import axios from 'axios';

const BASEURL = 'https://projectms-87ce916e8bd0.herokuapp.com/api/';
const API = axios.create({
    baseURL: BASEURL,
})

export default API;