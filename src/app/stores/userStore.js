import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import BaseCRUDStore from "../base/BaseCRUDStore";
import Notifier from "../utils/Notifier";
import { store } from "./store";

export default class UserStore extends BaseCRUDStore {
  userList = [];
  userName = JSON.parse(localStorage.getItem("user-info"));
  loginSucceeded = false;
  userInfo = {};

  constructor() {
    super();
    makeObservable(this, {
      userName: observable,
      loginSucceeded: observable,
      userList: observable,
      userInfo: observable
    })
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

  loadUsers = async () => {
    this.loading = true;
    try {
      const result = await agent.User.getUsers();
      runInAction(() => {
        this.userList = result;
        this.loading = false;
      });
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
      this.loading = false;
    }
  }

  getUserInformationById = async (userId) => {
    try {
      const result = await agent.User.getUserInformationById(userId);
      runInAction(() => {
        this.userInfo = result.value;
      })
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
    }
  }

  createUser = async (data) => {
    try {
      const result = await agent.User.createUser(data);
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
    }
  }

  deleteUserById = async (userId) => {
    try {
      const result = await agent.User.deleteUser(userId);
    } catch (error) {
      Notifier.error('There occured an error while getting the page list');
    }
  }

  updateUser = async (data) => {
    try {
      const result = await agent.User.updateUser(data);
    } catch (error) {
      Notifier.success('Error!');
    }
  }
}