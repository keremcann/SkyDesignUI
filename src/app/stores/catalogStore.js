import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from './../api/agent';

export default class CatalogStore {
    data = [];
    loading = true;
    searchText = "";
    info = "";

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.searchText,
            () => {
                this.loadCatalogs();
            }
        )
    }

    loadCatalogs = async () => {
        this.loading = true;
        try {
            const catalogs = await agent.Catalogs.list(this.searchText);
            runInAction(() => {
                this.data = catalogs.value;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    createCatalog = async (data) => {
        this.loading = true;
        try {
            const result = await agent.Catalogs.create(data);
            runInAction(() => {
                this.info = result.info;
            });
        } catch (error) {
            this.info = error.message;
        }
    }

    setPredicate = async (searchText) => {
        this.searchText = searchText;
    }
}