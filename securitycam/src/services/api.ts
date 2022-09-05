import axios from 'axios';
import endpoints from './constants';

const getPeople = async (clientId: string) => {
    try {
        return await axios.get(`${endpoints.PEOPLE_ENDPOINT}?clientId=${clientId}`);
    } catch (err: any) {
        console.log(err);
    }
    return [];
}

export default {
    getPeople
}