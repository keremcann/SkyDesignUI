import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import Notifier from "../utils/Notifier";

export default class GenericMenuContentStore {
    loading = true;
    columnList = [];
    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadContent = async (level1Menu = '', level2Menu = '', level3Menu = '') => {
        this.loading = true;
        try {
            const content = await agent.Page.getPageDetail(level1Menu, level2Menu, level3Menu);
            runInAction(() => {
                this.columnList = content.value.result.columnList;
                this.data = content.value.result.data;
                this.loading = false;
            });
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
            this.loading = false;
        }
    }
}