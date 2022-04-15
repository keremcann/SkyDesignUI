import { makeAutoObservable, makeObservable, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import BaseCRUDStore from '../base/BaseCRUDStore';
export default class SubCatalogDetailStore extends BaseCRUDStore {
    data = [];
    loading = true;

    constructor() {
        super();
        makeObservable(this, {
            data: observable,
            loading: observable
        });
    }

    loadSubCatalogDetailsBySubCatalogId = async (subCatalogId) => {
        this.loading = true;
        try {
            const subCatalogDetails = await agent.SubCatalogDetails.list(subCatalogId);
            runInAction(() => {
                this.data = subCatalogDetails.value;
                this.loading = false;
            });
        } catch (error) {
            this.loading = false;
        }
    }

    createCatalogDetail = async (data) => {
        try {
            const result = await agent.SubCatalogDetails.create(data);
            runInAction(() => {
                this.info = result.info;
                // this.data = [data, ...this.data]
            })

        } catch (error) {
            runInAction(() => {
                this.info = error.message;
            })
        }
    }

    updateCatalogDetail = async (data) => {
        try {
            const result = await agent.SubCatalogDetails.update(data);
            runInAction(() => {
                this.info = result.info;
                // this.data = [data, ...this.data]
            })

        } catch (error) {
            runInAction(() => {
                this.info = error.message;
            })
        }
    }

    deleteCatalogDetail = async (catalogDetailId) => {
        try {
            const result = await agent.SubCatalogDetails.delete(catalogDetailId);
        } catch (error) {

        }
    }
}