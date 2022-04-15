import { makeObservable, observable, runInAction, toJS } from "mobx";
import agent from "../api/agent";
import BaseCRUDStore from "../base/BaseCRUDStore";
import Notifier from "../utils/Notifier";


export default class PageStore extends BaseCRUDStore {
    data = [];
    loading = true;

    constructor() {
        super();
        makeObservable(this, {
            data: observable,
            loading: observable
        });
    }

    addPage = async () => {

        console.log(this.data)
        runInAction(() => {
            this.data = [
                ...this.data,
                {
                    isCustom: false,
                    pageIcon: null,
                    pageId: 78,
                    pageName: 'different-name',
                    pageUrl: "ftb---yasam-dongusu-yonetimi",
                    parentId: null
                }]
        })
        console.log(this.data)
    }

    loadPages = async () => {
        this.loading = true;
        try {
            const result = await agent.Page.getAllPages();
            runInAction(() => {
                this.data = result.value;
                this.loading = false;
            });
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
            this.loading = false;
        }
    }

    createPage = async (data) => {
        try {
            const result = await agent.Page.createPage(data);

            runInAction(() => {
                this.data = result.value;
            });
            // if (result.success === true) {
            //     Notifier.success(result.message)
            // }
        } catch (error) {
            Notifier.success('Error!');
        }
    }

    loadContent = async (level1Menu, level2Menu, level3Menu) => {
        alert(JSON.stringify(level2Menu))
        this.loading = true;
        try {
            const content = await agent.Page.getPageDetail(level1Menu, level2Menu, level3Menu);
            runInAction(() => {
                this.columnList = content.value.columnList;
                this.data = content.value.data;
            });
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
            this.loading = false;
        }
    }
}