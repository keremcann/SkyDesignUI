import { makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import BaseCRUDStore from "../base/BaseCRUDStore";
import Notifier from "../utils/Notifier";


export default class RoleStore extends BaseCRUDStore {
    data = [];
    loading = true;

    constructor() {
        super();
        makeObservable(this, {
            data: observable,
            loading: observable
        });
    }

    loadRoles = async () => {
        this.loading = true;
        try {
            const result = await agent.Role.getAllRoles();
            runInAction(() => {
                this.data = result.value;
                this.loading = false;
            });
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
            this.loading = false;
        }
    }

    createRole = async (data) => {
        try {
            const result = await agent.Role.createRole(data);
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
        }
    }

    deleteRoleById = async (roleId) => {
        try {
            const result = await agent.Role.delete(roleId);
        } catch (error) {
            Notifier.error('There occured an error while getting the page list');
        }
    }

    updateRole = async (data) => {
        try {
            const result = await agent.Role.update(data);
        } catch (error) {
            Notifier.success('Error!');
        }
    }
}