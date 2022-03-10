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
    create: (data) => requests.post("catalog/createCatalog", data),
}

const SubCatalogDetails = {
    list: (subCatalogId) => requests.get("subCatalogDetail/getAllSubCatalogDetailBySubCatalogId?subCatalogId=" + subCatalogId),
    create: (data) => requests.post('subCatalogDetail/createSubCatalogDetail', data),
    update: (data) => requests.post('subCatalogDetail/updateSubCatalogDetail', data),
    delete: (subCatalogDetailId) => requests.del('subCatalogDetail/deleteSubCatalogDetail?SubCatalogDetailId=' + subCatalogDetailId),

}

const agent = {
    Catalogs,
    SubCatalogDetails
}

export default agent;