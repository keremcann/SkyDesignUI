import { makeAutoObservable, runInAction } from "mobx";
import { useHistory } from "react-router-dom";
import agent from "../api/agent";
import Notifier from "../utils/Notifier";
import { store } from "./store";

export default class UserStore {
    userName = null;
    loginSucceeded = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.userName;
    }

    login = async (user) => {
        try {
            const loginResponse = await agent.Account.login(user);
            if (loginResponse?.success) {
                store.commonStore.setToken(loginResponse.token);
                runInAction(() => {
                    this.userName = loginResponse.fullName;
                    this.loginSucceeded = true;
                    Notifier.success('Login succeeded');
                });
            } else {
                Notifier.error(loginResponse?.errorMessage)
            }
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('token');
        this.userName = null;
        window.location.href = '/';
    }
}