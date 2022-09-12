import axios from 'axios';
import endpoints from './constants';
//import RNFetchBlob from 'rn-fetch-blob';

const getPeople = async (clientId: string) => {
    try {
        return await axios.get(`${endpoints.PEOPLE_ENDPOINT}?clientId=${clientId}`);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const setPeople = async (uuid: string | null, body: any) => {
    try {
        return await axios.post(`${endpoints.PEOPLE_ENDPOINT}?uuid=${uuid}`, body);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const getNotificationsConfig = async (userId: string) => {
    try {
        return await axios.get(`${endpoints.NOTIFICATION_CONFIG_ENDPOINT}?userId=${userId}`);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const setNotificationsConfig = async (uuid: string | null, userId: string, body: any) => {
    try {
        return await axios.post(`${endpoints.NOTIFICATION_CONFIG_ENDPOINT}?uuid=${uuid}&userId=${userId}`, body);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const getFaces = async (peopleId: string) => {
    try {
        return await axios.get(`${endpoints.FACES_ENDPOINT}?peopleId=${peopleId}`);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const setFaces = async (body: any) => {
    try {
        const data = new FormData();
        console.log('==body.image==', body.image);
        data.append("image", body.image);
        data.append("peopleId", body.peopleId);
        data.append("clientId", body.clientId);
        data.append("collection", body.collection);
        data.append("bucket", body.bucket);
        // return await axios.post(endpoints.FACES_ENDPOINT, data, {headers: { "Content-Type": "multipart/form-data" }});
        return await fetch(endpoints.FACES_ENDPOINT, { method: 'POST', headers: { "Content-Type": "multipart/form-data" }, body: data });
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

export default {
    getPeople,
    setPeople,
    getNotificationsConfig,
    setNotificationsConfig,
    getFaces,
    setFaces
};