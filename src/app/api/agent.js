import axios from 'axios';
import { store } from '../stores/store';
import Notifier from "../utils/Notifier";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
});

axios.interceptors.response.use(async response => {
    return response;
}, (error) => {
    if (error.response == undefined) {
        Notifier.error(error.message);
        return Promise.reject(error);
    }

    const { data, status, config, headers } = error.response;

    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                window.location.href = '/not-found';
            }
            if (data?.Message) {
                Notifier.error(data?.Message)
            } else {
                Notifier.primary(data);
            }
            break;
        case 401:
            if (headers['www-authenticate']?.startsWith('Bearer error')) {
                store.userStore.logout();
                Notifier.primary('Session expired');
            } else if (status === 401) {
                Notifier.warning('Not authorized');
            }
            break;
        case 404:
            window.location.href = '/not-found';
            break;
        case 500:
            window.location.href = '/server-error';
            break;
    }
    return Promise.reject(error);
})

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),

}

const Catalogs = {
    list: (searchText) => requests.get("catalog/getAllCatalog?searchText=" + searchText),
    create: (data) => requests.post("catalog/createCatalog", data),
}

const SubCatalogDetails = {
    list: (subCatalogId) => requests.get("subCatalogDetail/getAllSubCatalogDetailBySubCatalogId?subCatalogId=" + subCatalogId),
    create: (data) => requests.post('subCatalogDetail/createSubCatalogDetail', data),
    update: (data) => requests.post('subCatalogDetail/updateSubCatalogDetail', data),
    delete: (subCatalogDetailId) => requests.del('subCatalogDetail/deleteSubCatalogDetail?SubCatalogDetailId=' + subCatalogDetailId),

}

const Account = {
    login: (user) => requests.post('login/generateToken', user),

}

const agent = {
    Catalogs,
    SubCatalogDetails,
    Account,

}

export default agent;