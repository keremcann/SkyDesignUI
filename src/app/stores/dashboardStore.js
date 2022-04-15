import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class DashboardStore {

    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadMenus = async () => {
        const menus = await agent.Dashboard.getMenus();
        runInAction(() => {
            this.data = menus.value;
            return menus.value;
        });

    }
}