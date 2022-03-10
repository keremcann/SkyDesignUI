import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
export default class SubCatalogDetailStore {
    data = [];
    loading = true;

    updateModalOpen = false;
    addModalOpen = false;
    deleteModalOpen = false;

    toggleAddModal = () => {
        this.addModalOpen = !this.addModalOpen;
    }

    toggleUpdateModal = () => {
        this.updateModalOpen = !this.updateModalOpen;
    }

    toggleDeleteModal = () => {
        this.deleteModalOpen = !this.deleteModalOpen;
    }

    constructor() {
        makeAutoObservable(this);
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