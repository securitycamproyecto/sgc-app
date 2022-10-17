import axios, { AxiosRequestConfig } from 'axios';
import endpoints from './constants';
//import RNFetchBlob from 'rn-fetch-blob';

const getPeople = async (clientId: string | null) => {
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

const removePeople = async (id: string | null) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" }
        };
        return await axios.delete(`${endpoints.PEOPLE_ENDPOINT}/${id}`, options);
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

const getNotifications = async (userId: string) => {
    try {
        return await axios.get(`${endpoints.NOTIFICATION_CONFIG_ENDPOINT}/list/${userId}`);
    } catch (err: any) {
        console.log(err);
    }
    return { data: { Items: [] } };
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

const removeFaces = async (body: any) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" },
            data: body
        };
        return await axios.delete(`${endpoints.FACES_ENDPOINT}/${Date.now()}`, options);
    } catch (err: any) {
        console.log(err);
    }
    return [];
};

const getRecords = async (clientId: string | null) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" },
        };
        return await axios.get(`${endpoints.ANALYSIS_ENDPOINT}/records/${clientId}`, options);
    } catch (err: any) {
        console.log(err);
    }
    return [];
}

const getRecord = async (recordId:string, clientId: string) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" },
        };
        return await axios.get(`${endpoints.ANALYSIS_ENDPOINT}/record/${recordId}/${clientId}`, options);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {}};
}

const removeRecord = async (recordId: string) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" }
        };
        return await axios.delete(`${endpoints.ANALYSIS_ENDPOINT}/record/${recordId}`, options);
    } catch (err: any) {
        console.log(err);
    }
};


const getReports = async (clientId: string | null, startDate: string) => {
    try {
        const options: AxiosRequestConfig<any> = { 
            headers: { "Content-Type": "application/json;charset=utf-8" },
        };
        return await axios.get(`${endpoints.REPORTS_ENDPOINT}/${clientId}/${startDate}`, options);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {}};
}

const requestSupport = async (body: any) => {
    try {
        return await axios.post(`${endpoints.SUPPORT_ENDPOINT}?userId=${body.userId}`, body);
    } catch (err: any) {
        console.log(err);
    }
};

const getClients = async () => {
    try {
        return await axios.get(`${endpoints.CLIENTS_ENDPOINT}`);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {}};
};

const getClientByUser = async (userId: string) => {
    try {
        return await axios.get(`${endpoints.CLIENTS_ENDPOINT}/${userId}`);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {}};
};

const setClients = async (update: boolean, body: any) => {
    try {
        if (update)
            return await axios.put(`${endpoints.CLIENTS_ENDPOINT}`, body);
        else 
            return await axios.post(`${endpoints.CLIENTS_ENDPOINT}`, body);
    } catch (err: any) {
        console.log(err);
    }
};

const removeClients = async (id: string | null) => {
    try {
        return await axios.delete(`${endpoints.CLIENTS_ENDPOINT}/${id}`);
    } catch (err: any) {
        console.log(err);
    }
};

const getUsers = async () => {
    try {
        return await axios.get(`${endpoints.USERS_ENDPOINT}`);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {}};
};

const getDevices = async () => {
    try {
        return await axios.get(`${endpoints.DEVICES_ENDPOINT}`);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {Items: []}};
};

const getDevicesByClient = async (clientId: string | null) => {
    try {
        return await axios.get(`${endpoints.DEVICES_ENDPOINT}/${clientId}`);
    } catch (err: any) {
        console.log(err);
    }
    return {data: {Items: []}};
};

const postDevices = async (body: any) => {
    try {
        return await axios.post(`${endpoints.DEVICES_ENDPOINT}`, body);
    } catch (err: any) {
        console.log(err);
    }
    return { };
};

const putDevices = async (body: any) => {
    try {
        return await axios.put(`${endpoints.DEVICES_ENDPOINT}/${body.id}`, body);
    } catch (err: any) {
        console.log(err);
    }
    return { };
};

const deleteDevices = async (body: any) => {
    try {
        return await axios.post(`${endpoints.DEVICES_ENDPOINT}/delete/${body.id}`, body);
    } catch (err: any) {
        console.log(err);
    }
    return { };
};

export default {
    getPeople,
    setPeople,
    getNotificationsConfig,
    getNotifications,
    setNotificationsConfig,
    getFaces,
    setFaces,
    removeFaces,
    removePeople,
    getRecords,
    getRecord,
    removeRecord,
    getReports,
    requestSupport,
    getClients,
    getClientByUser,
    setClients,
    removeClients,
    getUsers,
    getDevices,
    getDevicesByClient,
    postDevices,
    putDevices,
    deleteDevices
};
