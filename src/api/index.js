import axios from 'axios';
import config from './config';

export default axios.create({
    baseURL: config.API_ROOT,
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
    },
    transformResponse: data => {
        // console.log('fetch response ', data);
        return JSON.parse(data);
    },
});
