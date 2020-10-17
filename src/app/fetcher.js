import axios from 'axios';
export default async (url) => {
    try {
        const response = await axios.get(url, {withCredentials: true});
        return response.data;
    } catch (err) {
        const error = `server error`;
        return {msg: error};
    }    
}