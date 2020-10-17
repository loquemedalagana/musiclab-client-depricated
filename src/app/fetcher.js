import axios from 'axios';
export default async (url) => {
    const response = await axios.get(url, {withCredentials: true});
    return response.data; 
}