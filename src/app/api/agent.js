import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
}

const Catalogs = {
    list: (searchText) => requests.get("Catalog/getAllCatalog?searchText=" + searchText),
    create: (data) => requests.post("Catalog/createCatalog", data),
}

const agent = {
    Catalogs,
}

export default agent;