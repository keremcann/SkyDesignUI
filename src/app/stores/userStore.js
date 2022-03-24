import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import Notifier from "../utils/Notifier";
import { store } from "./store";

export default class UserStore {
    userName = JSON.parse(localStorage.getItem("user-info"));
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
                    localStorage.setItem('user-info', JSON.stringify({
                        userName: loginResponse.fullName
                    }))
                    this.loginSucceeded = true;
                    Notifier.success(`Login successful. Welcome ${loginResponse.fullName}`);
                });
            } else {
                Notifier.error(loginResponse?.errorMessage)
            }
        } catch (error) {
            Notifier.error(error.message);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('token');
        localStorage.removeItem('user-info');
        window.location.href = '/';
    }
}